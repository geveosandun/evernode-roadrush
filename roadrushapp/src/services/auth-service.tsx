import HotPocketClientService from './hp-client-service';
import AppSecureStorageService from './secure-storage-service';

export default class AuthService {
  private static instance: AuthService;
  private _contractService: any;

  private constructor() {
    this._contractService = HotPocketClientService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async submitLoginRequest(publickKey: any) {
    const message = {
      Service: 'Authentication',
      Action: 'Login',
      Data: {
        PublicKey: publickKey,
      },
    };

    try {
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);

      if (response.hasAccount) {
        await AppSecureStorageService.setItem('isLoggedIn', 'true');
        await AppSecureStorageService.setItem(
          'user',
          JSON.stringify(response.user),
        );
      }
      return response.hasAccount;
    } catch (error) {
      throw error;
    }
  }

  public async submitLogoutRequest() {
    try {
      await AppSecureStorageService.removeItem('isLoggedIn');
      await AppSecureStorageService.removeItem('user');
      return true;
    } catch (error) {
      console.error('Error setting logged in state', error);
      return false;
    }
  }

  static async checkAuthentication() {
    try {
      const loggedIn = await AppSecureStorageService.getItem('isLoggedIn');
      return loggedIn === 'true';
    } catch (error) {
      console.error('Error retrieving logged in state', error);
      return false;
    }
  }
}
