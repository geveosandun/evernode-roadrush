import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';
import { Tables } from '../../Constants/Tables';
import { SharedService } from '../Common.Services/SharedService';

const settings = require("../../settings.json").settings;
const { SqliteDatabase } = require("./../Common.Services/dbHandler").default;

export class TransactionService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
    }

    async addTransaction() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();

            const updatedRideRequest = await this.#dbContext.updateValue(Tables.RIDEREQUESTS, {RequestStatus: "COMPLETED"}, {RideRequestID: this.#message.Data.RideRequestID});
            dbp++;

            const updatedRides = await this.#dbContext.updateValue(Tables.RIDES, {RideStatus: "COMPLETED"}, {RideRequestID: this.#message.Data.RideRequestID});
            dbp++;

            let inputData = this.#message.Data;
            inputData.CreatedDate = SharedService.getCurrentTimestamp();
            inputData.UpdatedDate = SharedService.getCurrentTimestamp();
            const rowId = await this.#dbContext.insertValue(Tables.EVERSTRANSACTIONS, inputData);
            dbp++;

            if (rowId.lastId > 0) {
                console.log('successfully added transaction ', rowId.lastId);
                resObj.success = "Transaction Record Added Successfully";
            }
            
            return resObj;

        } catch (error) {
            console.log('error occured in add transaction', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured add transaction",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.ADD_TRANSACTION_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }

    async getTransactions() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();

            let payments = await this.#dbContext.getValues(Tables.EVERSTRANSACTIONS, {
                FromAddress: this.#message.Data.XRPAddress
            });
            dbp++;

            let received = await this.#dbContext.getValues(Tables.EVERSTRANSACTIONS, {
                ToAddress: this.#message.Data.XRPAddress
            });
            dbp++;

            const resData = {
                Payments: payments,
                Received: received
            }

            console.log('Response', resData);

            resObj.success = resData;
            
            return resObj;

        } catch (error) {
            console.log('error occured in getTransaction', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in get transactions",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_TRANSACTION_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }
}