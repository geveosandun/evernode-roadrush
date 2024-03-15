import { Tables } from "../../Constants/Tables";
import { ActivityLogService } from "../Common.Services/ActivityLog.Service";
import { SharedService } from "../Common.Services/SharedService";
import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';

const settings = require("../../settings.json").settings;
const { SqliteDatabase } = require("./../Common.Services/dbHandler").default;

export class PassengerService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
        this.#activityLogger = new ActivityLogService(message);
    }

    async bookRide() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();
            const data = this.#message.Data;
            console.log("DATA ", data);
            let userId = data.passengerUserId;
            console.log("***", userId)
            let query = `SELECT PassengerID FROM ${Tables.PASSANGERS}
                        WHERE UserID = ?`;
            const dataRow = await this.#dbContext.runSelectQuery(query,[userId]);
            console.log("ID ",dataRow[0].PassengerID);
            dbp++;
            const inputData = {
               // DriverID: data.driverId,
				PassengerID: dataRow[0].PassengerID,
				PickupLocation: data.pickupLocation,
				Destination: data.destination,
                PickUpAddress: data.originAddress,
                DestinationAddress: data.destinationAddress,
                Distance: data.distanceinKm,
                Price: data.priceForTheRideInEvrs,
				RideDateTime: data.rideDateTime,
				RequestStatus: "PENDING",
				CreatedDate: SharedService.getCurrentTimestamp(),
				CreatedBy: data.passengerName,
				UpdatedDate: SharedService.getCurrentTimestamp(),
				UpdatedBy: data.passengerName,
            }
            dbp++

            const rowId = await this.#dbContext.insertValue(Tables.RIDEREQUESTS, inputData);
            console.log("rowId****", rowId)
            dbp++

            if (rowId.lastId > 0) {
                resObj.success = rowId.lastId;
            }

            return resObj;
        } catch (error) {
            console.log('error in try catch', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in ride booking",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.RIDE_BOOKING_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }

    async getPassengerId(userId) {
        try{
        let query = `SELECT ${Tables.PASSANGERS}.PassengerID FROM ${Tables.PASSANGERS}
                        WHERE UserID = ${userId}`;
        const passengerId = await this.#dbContext.runSelectQuery(query);
        return passengerId;
    }catch(error){
        console.log("Error occured while fetching passengerId");
        throw error;
    }
}

async gerCurrentRideDetails(){
    let resObj = {};
    let dbp = 0;
    try {
        this.#dbContext.open();
        const requestId = this.#message.Data.requestId;

        let queryRideRequests = `SELECT ${Tables.RIDEREQUESTS}.RequestStatus, ${Tables.RIDEREQUESTS}.DriverID FROM ${Tables.RIDEREQUESTS}
                    WHERE RideRequestID = ?`;
        const rideRequestdataRow = await this.#dbContext.runSelectQuery(queryRideRequests, [requestId]);
        console.log("Ride row****",rideRequestdataRow)
        dbp++;

        const driverId = rideRequestdataRow[0].DriverID;
        console.log("Driver Id****",driverId)
        if (driverId != null) {
            const queryDriver = `SELECT ${Tables.DRIVERS}.*
                                    FROM ${Tables.DRIVERS}
                                    WHERE ${Tables.DRIVERS}.DriverID = ?`
            const driverRow = await this.#dbContext.runSelectQuery(queryDriver, [driverId]);
            console.log("Driver row****", driverRow)
            dbp++;
            const driversDetails = rows.map(row => new DriverDto(
                driverRow.DriverID,
                driverRow.UserID,
                driverRow.DriverLicenseNumber,
                driverRow.VehicleMake,
                driverRow.VehicleModel,
                driverRow.VehiclePlateNumber
            )
            );

            const rideDetails = { isSuccess:true,status: rideRequestdataRow[0].RequestStatus, driverDetails: driversDetails }
            resObj.success = rideDetails;
        }else{
            resObj.success = "PENDING";
        }
  
        return resObj;
    } catch (error) {
        console.log('Error in fetching current ride details ', error);
        throw new ErrorResponseDto(
            this.#message, dbp,
            "Error in fetching current ride details",
            error.message, ErrorCodes.DEFAULT,
            new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_CURRENT_RIDE_DETAILS, error.message, Date.now())
        );
    } finally {
        this.#dbContext.close();
    }
}

}