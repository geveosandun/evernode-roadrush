import { Tables } from "../../Constants/Tables";
import { ActivityLogService } from "../Common.Services/ActivityLog.Service";
import { SharedService } from "../Common.Services/SharedService";
import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';
import { DriverDto } from "../../Dto/DriverDto";

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

    async getDriversDetails() {
        let resObj = {};
        let dbp = 0;

        try{
            this.#dbContext.open();
            dbp++;
            let query = `SELECT ${Tables.DRIVERS}.*
                         FROM ${Tables.DRIVERS}`;
             
            const rows = await this.#dbContext.runSelectQuery(query);
            dbp++;
            const driversDetails = rows.map(row => new DriverDto(
                row.DriverID,
                row.UserID,
                row.DriverLicenseNumber,
                row.VehicleMake,
                row.VehicleModel,
                row.VehiclePlateNumber
            )
            );
            resObj.success = driversDetails;
            return resObj;             
        }catch(error) {
            console.log("Error occured when fetching driver details.")
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured when fetching driver details",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_DRIVER_DETAILS_ERROR, error.message, Date.now())
            );
        }
        finally{
            this.#dbContext.close();
            }
    }

    async getRideRequests(driverUserId) {
        let resObj = {};
        let dbp = 0;
        console.log( "Driver userId: ", driverUserId);
        try {
            this.#dbContext.open();
            dbp++;
            let query = `
            SELECT ${Tables.RIDEREQUESTS}.*
            FROM ${Tables.RIDEREQUESTS}
            JOIN ${Tables.PASSANGERS} ON ${Tables.RIDEREQUESTS}.PassengerID = ${Tables.PASSANGERS}.PassengerID
            WHERE ${Tables.PASSANGERS}.UserID != ? AND ${Tables.RIDEREQUESTS}.RequestStatus = 'PENDING'
        `;

        // Execute the query with driverUserId as parameter
            const rows = await this.#dbContext.runSelectQuery(query, [driverUserId]);
            console.log("Ride requests:  ", rows)
            dbp++;
            resObj.success = rows;
            return resObj;
        } catch (error) {
            console.log('Error in fetching ride requests', error);
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

    async acceptRide(rideDetails) {
        let resObj = {};
        let dbp = 0;
        console.log("DATA ",rideDetails);
        try {
            this.#dbContext.open()
            const driverId = await this.getDriverIDByUserId(rideDetails.driverUserID);
            console.log("DID####", driverId)
            dbp++;
            const updatedRows = await this.#dbContext.updateValue(Tables.RIDEREQUESTS, { DriverID: driverId , RequestStatus: "ACCEPTED",}, {RideRequestID: rideDetails.rideRequestId});
            console.log("RideRequest record updated", updatedRows);
            dbp++
            const inputData = {
                DriverID: driverId,
				PassengerID: rideDetails.passengerId,
				PickupLocation: rideDetails.pickUpLocation,
				Destination: rideDetails.destination,
                Distance: rideDetails.rideDistance,
				RideStatus: "COMMITTED",
                RideRequestId:rideDetails.rideRequestId,
				RideDateTime: rideDetails.rideDateTime,
				FareAmount: rideDetails.rideFareAmount,
				CreatedDate: SharedService.getCurrentTimestamp(),
				//CreatedBy: rideDetails.driverID,
				UpdatedDate: SharedService.getCurrentTimestamp(),
				//UpdatedBy: rideDetails.driverID,
            }
            const rowId = await this.#dbContext.insertValue(Tables.RIDES, inputData);
            console.log("Ride record inserted ", rowId);
            dbp++

            if (rowId.lastId > 0) {
                resObj.success = "Ride Accepted Successfully";
            }

            return resObj;
        } catch (error) {
            console.log('Error in accepting ride request', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in accepting ride request",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.ACCEPT_RIDE_REQUEST_ERRO, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }

    async getDriverIDByUserId(userId){
        let resObj = {};
        let dbp = 0;
        console.log("User Id ", userId);
        try{
            let query = `
            SELECT ${Tables.DRIVERS}.DriverID
            FROM ${Tables.DRIVERS}
            WHERE ${Tables.DRIVERS}.UserID = ?
        `;
        dbp++;
        // Execute the query with driverUserId as parameter
            const rows = await this.#dbContext.runSelectQuery(query, [userId]);
            console.log("Row####", rows)
            return rows[0].DriverID;

        } catch (error) {
            console.log('Error in retrieving driver id ', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in retrieving driver name",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_DRIVER_NAME_ERROR, error.message, Date.now())
            );
        } 

    }

    async getPassengerNameById(passengerId){
        let resObj = {};
        let dbp = 0;
        console.log("Driver Id ",driverId);
        try{
            let query = `
            SELECT ${Tables.USERS}.UserName
            FROM ${Tables.USERS}
            JOIN ${Tables.PASSANGERS} ON ${Tables.USERS}.UserID = ${Tables.PASSANGERS}.UserID
            WHERE ${Tables.PASSANGERS}.PassengerID = ?
        `;
        dbp++;
        // Execute the query with driverUserId as parameter
            const rows = await this.#dbContext.runSelectQuery(query, [passengerId]);
            resObj.success=rows;

        } catch (error) {
            console.log('Error in retrieving passenger name ', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in retrieving passenger name",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_PASSENGER_NAME_ERROR, error.message, Date.now())
            );
        } 

    }

    async getDriverXRPAddress() {
        let resObj = {};
        let dbp = 0;
        console.log('msgs', this.#message);

        try {
            this.#dbContext.open();
            let query = `SELECT ${Tables.USERS}.XRPAddress FROM ${Tables.USERS}, ${Tables.DRIVERS} WHERE ${Tables.USERS}.UserID = ${Tables.DRIVERS}.UserID AND ${Tables.DRIVERS}.DriverID = ?`;
            let params = this.#message.Data.DriverID;
            const rows = await this.#dbContext.runSelectQuery(query, [params]);
            console.log('upt', rows);
            resObj.success = rows[0];
            console.log('res', resObj);
            return resObj;
        } catch (error) {
            console.log('Error in retrieving driver XRP address', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in retrieving driver XRP address",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_DRIVER_XRPADDRESS_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }

    async endTrip() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();

            const updatedRideRequest = await this.#dbContext.updateValue(Tables.RIDEREQUESTS, {RequestStatus: "FINISHED"}, {RideRequestID: this.#message.Data.RideRequestID});
            dbp++;
            console.log(updatedRideRequest);

            const updatedRides = await this.#dbContext.updateValue(Tables.RIDES, {RideStatus: "FINISHED"}, {RideRequestID: this.#message.Data.RideRequestID});
            dbp++;
            console.log(updatedRides);

            if (updatedRideRequest.changes > 0) {
                console.log('successfully added transaction ', updatedRideRequest.changes);
                resObj.success = "Trip Ended Successfully";
            }
            
            return resObj;

        } catch (error) {
            console.log('error in try catch', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured end trip",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.END_TRIP_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }
}