import { Tables } from "../../Constants/Tables";
import { ActivityLogService } from "../Common.Services/ActivityLog.Service";
import { SharedService } from "../Common.Services/SharedService";
import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';

const settings = require("../../settings.json").settings;
const { SqliteDatabase } = require("./../Common.Services/dbHandler").default;

export class DriverService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
        this.#activityLogger = new ActivityLogService(message);
    }

    async getRideRequests() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();
            dbp++;
            let query = `SELECT ${Tables.RIDEREQUESTS}.*
                            FROM ${Tables.RIDEREQUESTS}
                            JOIN ${Tables.PASSANGERS} ON ${Tables.RIDEREQUESTS}.PassengerID = ${Tables.PASSANGERS}.PassengerID
                            WHERE ${Tables.PASSANGERS}.UserID != ? AND ${Tables.RIDEREQUESTS}.RequestStatus = 'PENDING'`;
            let params = this.#message.Data.UserID;
            const rows = await this.#dbContext.runSelectQuery(query, params);
            dbp++;
            resObj.success = rows;
            return resObj;
        } catch (error) {
            console.log('error in try catch', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in fetching ride requests",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_RIDE_REQUESTS_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }

    async acceptRide() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open()
            dbp++;
            const rideRequest = await this.#dbContext.getValues(Tables.RIDEREQUESTS, {RideRequestID: this.#message.Data.RequestID});
            dbp++;
            const updatedRows = await this.#dbContext.updateValues(Tables.RIDEREQUESTS, {RequestStatus: "ACCEPTED"}, {RideRequestID: this.#message.Data.RequestID});
            dbp++
            const inputData = {
                DriverID: rideRequest[0].DriverID,
				PassengerID: rideRequest[0].PassengerID,
				PickupLocation: rideRequest[0].PickupLocation,
				Destination: rideRequest[0].Destination,
				RideStatus: "COMMITTED",
				RideDateTime: rideRequest[0].RideDateTime,
				FareAmount: this.#message.Data.fee,
				CreatedDate: SharedService.getCurrentTimestamp(),
				CreatedBy: this.#message.Data.driverName,
				UpdatedDate: SharedService.getCurrentTimestamp(),
				UpdatedBy: this.#message.Data.driverName,
            }
            const rowId = await this.#dbContext.insertValue(Tables.RIDES, inputData);
            dbp++

            if (rowId.lastId > 0) {
                resObj.success = "Ride Accepted Successfully";
            }

            return resObj;
        } catch (error) {
            console.log('error in try catch', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in accpeting ride requests",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.ACPET_RIDE_REQUEST_ERRO, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }
}