import { LocalStorageKeys } from '../helpers/constants';
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
      console.log("Error in getting driver details.")
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

  public async bookRide(passengerUserId, origin, destination, passangerName, originAddress, destinationAddress, distanceinKm, priceForTheRideInEvrs){
    const message = {
      Service: 'Passenger',
      Action: 'BookRide',
      Data: {
        passengerUserId: passengerUserId,
        passengerName: passangerName,
        // driverId: driverId,
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
        console.log("RESPONSE",response)
      }
      return response;
    } catch (error) {
      console.log("Error in booking the ride. ", error)
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
        console.log("RESPONSE",response)
      }
      return response;
    } catch (error) {
      console.log("Error in getting the ride request. ", error)
      throw error;
    }
  }

  public async acceptRide(rideDetails, userId){
    const message ={
      Service: 'Driver',
      Action: 'AcceptRide',
      Data: {
        driverUserID: userId,
        passengerId: rideDetails.PassengerID,
        passengerName: rideDetails.CreatedBy,
        pickUpLocation: rideDetails.PickupLocation,
        destination:rideDetails.Destination,
        rideDateTime: rideDetails.RideDateTime,
        rideRequestId: rideDetails.RideRequestID,
        rideFareAmount: rideDetails.Price,
        rideDistance: rideDetails.Distance
      }
    }

    try {
      console.log("MESSAGE ", message)
      const response: any =
        await HotPocketClientService.submitInputToContract(message);
      if (response) {
        console.log("RESPONSE",response)
      }
      return response;
    } catch (error) {
      console.log("Error in accepting the ride. ", error)
      throw error;
    }
  }

  
  public async getRideHistory(userId){
    const loggedInAs = await AppSecureStorageService.getItem('loggedInAs');
    const message ={
      Service: 'User',
      Action: 'GetRideHistory',
      Data: {
        userId: userId,
        loggedInAs: loggedInAs
      }
    }

    try {
      console.log("MESSAGE ", message)
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);
      if (response) {
        console.log("RESPONSE",response)
      }
      return response;
    } catch (error) {
      console.log("Error in getting the ride history. ", error)
      throw error;
    }
  }

  public async gerCurrentRideDetails(requestId){
    const message ={
      Service: 'Passenger',
      Action: 'GetCurrentRideDetails',
      Data: {
        requestId: requestId,
      }
    }

    try {
      console.log("MESSAGE ", message)
      const response: any =
        await HotPocketClientService.submitContractReadRequest(message);
      if (response) {
        console.log("RESPONSE",response)
      }
      return response;
    } catch (error) {
      console.log("Error in getting current ride details. ", error)
      throw error;
    }
  }

  public async getDriverXRPAddress(driverId: any) {
    const message = {
      Service: 'Driver',
      Action: 'GetDriverXRPAddress',
      Data: {
        DriverID: driverId,
      }
    };
    console.log('msg', message);
    

    try {
      const response: any = await HotPocketClientService.submitContractReadRequest(message);
      return response.XRPAddress;
    } catch (error) {
      console.log('Error in getting the driver xrp address.', error);
      
      throw error;
    }
  }
  
  public async addTransaction(transaction: any) {
    const message = {
      Service: 'Transaction',
      Action: 'Add',
      Data: transaction
    }

    try {
      const response: any = await HotPocketClientService.submitInputToContract(message);
      return response;
    } catch (error) {
      console.log('Error in adding transaction.', error);
      
      throw error;
    }
  }

  public async getTransactions() {
    const xrpAddress = await AppSecureStorageService.getItem(LocalStorageKeys.xrpAddress);
    const message = {
      Service: 'Transaction',
      Action: 'Get',
      Data: {
        XRPAddress: xrpAddress,
      }
    };

    try {
      const response: any = await HotPocketClientService.submitContractReadRequest(message);
      return response;
    } catch (error) {
      console.log('Error in getting transactions.', error);
      
      throw error;
    }
  }

  public async getUserOngoingRides(userId) {
  
    const loggedInAs = await AppSecureStorageService.getItem('loggedInAs')
    const message = {
      Service: 'User',
      Action: 'GetUserOngoingRides',
      Data: {
        userId: userId,
        loggedInAs: loggedInAs
      }
    };

    try {
      const response: any = await HotPocketClientService.submitContractReadRequest(message);
      return response;
    } catch (error) {
      console.log('Error in getting user ongoin rides.', error);
      
      throw error;
    }
  }

  public async endTrip(rideRequestId: any) {
    const message = {
      Service: 'Driver',
      Action: 'EndTrip',
      Data: {
        RideRequestID: rideRequestId
      }
    }

    try {
      const response: any = await HotPocketClientService.submitInputToContract(message);
      return response;
    } catch (error) {
      console.log('Error in end trip.', error);
      
      throw error;
    }
  }
}
