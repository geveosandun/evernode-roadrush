import HotPocketClientService from './hp-client-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ApiService {
  private static instance: ApiService;
  private _contractService: any;

  private constructor() {
    this._contractService = HotPocketClientService.getInstance();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
        ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async getDriversDetails() {
    const message = {
      Service: 'Driver',
      Action: 'GetDriversDetails',
    };

    try {
      console.log("in2 ",message)
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);
        console.log("in3", response)
      if (response) {
        console.log("***", response)
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async submitLogoutRequest() {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      return true;
    } catch (error) {
      console.error('Error setting logged in state', error);
      return false;
    }
  }

  static async checkAuthentication() {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      return loggedIn === 'true';
    } catch (error) {
      console.error('Error retrieving logged in state', error);
      return false;
    }
  }
}
