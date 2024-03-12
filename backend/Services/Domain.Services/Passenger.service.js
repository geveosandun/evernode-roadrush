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
            let query = `SELECT PassengerID FROM ${Tables.PASSANGERS}
                        WHERE UserID = ${userId}`;
            const dataRow = await this.#dbContext.runSelectQuery(query);
            console.log("ID ",dataRow.PassengerID);
            dbp++;
            const inputData = {
               // DriverID: data.driverId,
				PassengerID: dataRow.PassengerID,
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
            dbp++

            if (rowId.lastId > 0) {
                resObj.success = "Ride Booked Successfully";
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
        let query = `SELECT PassengerID FROM ${Tables.PASSANGERS}
                        WHERE UserID = ${userId}`;
        const passengerId = await this.#dbContext.runSelectQuery(query);
        return passengerId;
    }catch(error){
        console.log("Error occured while fetching passengerId");
        throw error;
    }
}
}