import { ErrorCodes } from '../../Constants/ErrorCodes';
import { LogMessages } from '../../Constants/LogMessages';
import { LogTypes } from '../../Constants/LogTypes';
import { Tables } from '../../Constants/Tables';
import { ErrorResponseDto, LoggingInfo } from '../../Dto/ErrorResponseDto';
import { ActivityLogService } from './ActivityLog.Service';

const settings = require('../../settings.json').settings;
const { SqliteDatabase } =  require("./dbHandler").default;
const crypto = require("crypto");
 
export class AuthenticationService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
        this.#activityLogger = new ActivityLogService(message);
    }

    async login() {
        let resObj = {};
        let dbp = 0;

        try {
            this.#dbContext.open();

            let foundUser = await this.#dbContext.getValues(Tables.USERS, {
                XRPAddress: this.#message.Data.XRPAddress
            });
            dbp++;

            if (foundUser.length > 0) {
                dbp++;
                const resData = {
                    hasAccount: true,
                    user: {
                        UserID: foundUser[0].UserID,
                        UserName: foundUser[0].Username,
                        XRPAddress: foundUser[0].XRPAddress,
                        Email: foundUser[0].Email
                    }
                }
                resObj.success = resData;
            } else {
                const resData= {
                    hasAccount: false
                };
                resObj.success = resData;
            }

            console.log('Reponse', resObj)
            return resObj;
        } catch (error) {
            console.log('Encountered error in login', error);
            throw new ErrorResponseDto(
                this.#message, dbp,
                "Error occured in user login",
                error.message, ErrorCodes.DEFAULT,
                new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.USER_LOGIN_ERROR, error.message, Date.now())
            );
        } finally {
            this.#dbContext.close();
        }
    }
}