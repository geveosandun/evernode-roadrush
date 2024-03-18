import { Tables } from "../../Constants/Tables";
import { ActivityLogService } from "../Common.Services/ActivityLog.Service";
import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';

const settings = require("../../settings.json").settings;
const { SqliteDatabase } = require("../Common.Services/dbHandler").default;

export class UserService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
        this.#activityLogger = new ActivityLogService(message);
    }

    async getRideHistory(data) {
        let resObj = {};
        let dbp = 0;
        let query = ``;
        try {
            console.log("DATA", data)
            this.#dbContext.open();
            const userId = data.userId;
            const loggedInAs = data.loggedInAs;

            if (loggedInAs == "driver") {
                query = `SELECT ${Tables.RIDES}.*
                    FROM ${Tables.RIDES}
                    JOIN ${Tables.DRIVERS} ON ${Tables.RIDES}.DriverID = ${Tables.DRIVERS}.DriverID
                    WHERE ${Tables.DRIVERS}.UserID = ? AND ${Tables.RIDES}.RideStatus == "COMPLETED`;
            } else if (loggedInAs == "passenger") {
                query = `SELECT ${Tables.RIDES}.*
                    FROM ${Tables.RIDES}
                    JOIN ${Tables.PASSENGERS} ON ${Tables.RIDES}.PassengerID = ${Tables.PASSENGERS}.PassengerID
                    WHERE ${Tables.PASSENGERS}.UserID = ? AND ${Tables.RIDES}.RideStatus == "COMPLETED`;
            }
            const rows = await this.#dbContext.runSelectQuery(query, [userId]);
            console.log("Ride history:  ", rows)
            dbp++
            resObj.success = rows;
            return resObj;
        } catch (error) {
            console.log('Error in fetching ride history', error);
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

    async getUserOngoingRides(data) {
        let resObj = {};
        let dbp = 0;
        let query = ``;
        try {
            console.log("DATA", data)
            this.#dbContext.open();
            const userId = data.userId;
            const loggedInAs = data.loggedInAs;

            if (loggedInAs == "driver") {
                query = `SELECT ${Tables.RIDEREQUESTS}.*
                    FROM ${Tables.RIDEREQUESTS}
                    JOIN ${Tables.DRIVERS} ON ${Tables.RIDEREQUESTS}.DriverID = ${Tables.DRIVERS}.DriverID
                    WHERE ${Tables.DRIVERS}.UserID = ? AND ${Tables.RIDEREQUESTS}.RideStatus == "COMMITTED"
                    ORDER BY ${Tables.RIDEREQUESTS}.RideDateTime DESC`;
            } else if (loggedInAs == "passenger") {
                query = `SELECT ${Tables.RIDEREQUESTS}.*
                    FROM ${Tables.RIDEREQUESTS}
                    JOIN ${Tables.PASSENGERS} ON ${Tables.RIDEREQUESTS}.PassengerID = ${Tables.PASSENGERS}.PassengerID
                    WHERE ${Tables.PASSENGERS}.UserID = ?  AND ${Tables.RIDEREQUESTS}.RequestStatus == "ACCEPTED"
                    ORDER BY ${Tables.RIDEREQUESTS}.RideDateTime DESC`;
            }
            const rows = await this.#dbContext.runSelectQuery(query, [userId]);
            console.log("Current ride status:  ", rows)
            dbp++
            resObj.success = rows;
            return resObj;
        } catch (error) {
            console.log('Error in fetching current ride status', error);
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

}