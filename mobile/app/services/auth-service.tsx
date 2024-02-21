import axios from "axios";
import HotPocketClientService from "./hp-client-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthService {
  private static instance: AuthService;
  private _contractService: any;

  private _userInfo: any; // google / microsoft SSO response object
  private _sessionId: any;
  private _loginType: any;

  private constructor() {
    this._contractService = HotPocketClientService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public static getUserInfoObj(): any {
    return AuthService.getInstance()._userInfo;
  }

  public static setUserInfoObj(value: any, session: any): void {
    AuthService.getInstance()._userInfo = value;
    AuthService.getInstance()._sessionId = session;
  }

  public static geLoginType(): any {
    return AuthService.getInstance()._loginType;
  }

  public static setLoginType(value: any): void {
    AuthService.getInstance()._loginType = value;
  }

  public async submitLoginRequest(loginData: any){
    const userCurrentIp = await axios.get("https://api.ipify.org/?format=json");

    const message = {
      Service: "User",
      Action: "LoginUser",
      Auth: {
        IdToken: loginData.accessToken,
        AuthProvider: loginData.authProvider,
        AccessLevel: "User",
        IpAddress: userCurrentIp,
      },
    };
    let output = await HotPocketClientService.submitInputToContract(
      message
    );
    return output;
  }

  public async submitLogOutRequest() {
    const message = {
      Service: "User",
      Action: "LogOutUser",
      Auth: {
        sessionId: (await AsyncStorage.getItem("sessionId")).replace(/['"]/g, '')
      }
    };

    try {
      HotPocketClientService.submitInputToContract(message);
      this._userInfo = null;
      this._sessionId = null;
      this._loginType = null;
    } catch (error) {
      console.log(error);
    }
    }

  static async checkAuthentication() {
    try {
      const user = await AsyncStorage.getItem("user");
      const sessionId = await AsyncStorage.getItem("sessionId");
      const loginType = await AsyncStorage.getItem("loginType");

      const userObj = JSON.parse(user);
      const parsedObject = JSON.parse(user);

      AuthService.setUserInfoObj(userObj, sessionId);
      AuthService.setLoginType(loginType);
      
      const storedIsLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      return storedIsLoggedIn === "true";
    } catch (error) {
      console.error("Error retrieving authentication state:", error);
      return false;
    }
  }

  static async setLoggedIn(loginType: string) {
    const userDetails = this.getUserInfoObj();
    const inpString = JSON.stringify(userDetails);

    await AsyncStorage.setItem("sessionId", AuthService.getInstance()._sessionId)
    await AsyncStorage.setItem("user", inpString)
    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("loginType", loginType);
  }

  static async setLoggedOut() {
    await AsyncStorage.removeItem("sessionId");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("loginType");
  }
}
