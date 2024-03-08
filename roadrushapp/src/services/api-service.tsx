import HotPocketClientService from './hp-client-service';
import AppSecureStorageService from './secure-storage-service';

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
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);
      if (response) {
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async submitLogoutRequest() {
    try {
      await AppSecureStorageService.removeItem('isLoggedIn');
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

  public async bookRide(driverId, passengerUserId, origin, destination, passangerName, originAddress, destinationAddress, distanceinKm, priceForTheRideInEvrs){
    const message = {
      Service: 'Passenger',
      Action: 'BookRide',
      Data: {
        passengerUserId: passengerUserId,
        passengerName: passangerName,
        driverId: driverId,
        pickupLocation: origin,
        destination: destination,
        originAddress: originAddress,
        destinationAddress: destinationAddress,
        distanceinKm: distanceinKm,
        priceForTheRideInEvrs: priceForTheRideInEvrs,
        rideDateTime: Date.now(),
      }
    }
    try {
      console.log("MESSAGE ", message)
      const response: any =
        await HotPocketClientService.submitInputToContract(message);
      if (response) {
        console.log("RES",response)
      }
      return response;
    } catch (error) {
      console.log("Err ", error)
      throw error;
    }
  }

  public async getRideRequests(userId){
    const message ={
      Service: 'Driver',
      Action: 'GetRideRequests',
      Data: {
        userId: userId
      }
    }

    try {
      console.log("MESSAGE ", message)
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);
      if (response) {
        console.log("RES",response)
      }
      return response;
    } catch (error) {
      console.log("Err ", error)
      throw error;
    }
  }
}
