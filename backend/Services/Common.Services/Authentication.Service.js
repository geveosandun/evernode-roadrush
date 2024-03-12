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
                // const hash = crypto.createHash('SHA256');
                // hash.update(this.#message.Data.Password);
                // const hashedValue = hash.digest('hex');
                // dbp++;

                // console.log('user record', foundUser[0]);
                // console.log('hash Password: ', hashedValue);

                // if (hashedValue === foundUser[0].Password) {
                //     console.log('success');
                //     resObj.success = 'Login Success';
                // } else {
                //     console.log('fail');
                //     resObj.error = new ErrorResponseDto(this.#message, dbp, "Password not Valid", new Error("Error occured in user login"));
                // }
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
                // resObj.error = new ErrorResponseDto(this.#message, dbp, "User not Valid", new Error("Error occured in user login"));
                const resData= {
                    hasAccount: false
                };
                resObj.success = resData;
            }

            console.log('return', resObj)
            return resObj;
        } catch (error) {
            console.log('error in try catch', error);
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