import { LogMessages } from "../../Constants/LogMessages";
import { LogTypes } from "../../Constants/LogTypes";
import { Tables } from "../../Constants/Tables";
import { SharedService } from "./SharedService";
import {ErrorResponseDto, LoggingInfo} from "../../Dto/ErrorResponseDto";
import {ErrorCodes} from "../../Constants/ErrorCodes";
const { SqliteDatabase } = require("./dbHandler").default;
const settings = require("../../settings.json").settings;

export class ActivityLogService {
	#dbPath = settings.dbPath;
	#dbContext = null;
	#message = null;
	#date = SharedService.getCurrentTimestamp();

	constructor(message) {
		this.#dbContext = new SqliteDatabase(this.#dbPath);
		this.#message = message;
	}

	async writeLog(logType, message, exceptionMessage = null) {
		try {
			let userDetails =
				this.#message.User &&
					this.#message.User.Name &&
					this.#message.User.Email &&
					this.#message.User.AccessLevel
					? `${this.#message.User.Name} (${this.#message.User.Email}) (${this.#message.User.AccessLevel
					})`
					: "N/A - No session data.";

			let data = {
				ActivityType: logType,
				User: userDetails,
				Service: this.#message.Service,
				Action: this.#message.Action,
				Message: message,
				ExceptionMessage: exceptionMessage,
				TimeStamp: this.#date,
			};

			this.#dbContext.open();
			await this.#dbContext.insertValue(Tables.ACTIVITYLOG, data);
		} catch (error) {
			console.log("Error writing activity log :- ", error);
		} finally {
			this.#dbContext.close();
		}
	}

	async getActivityLogs() {
		let resObj = {};

		try {
			this.#dbContext.open();
			const activityLogs = await this.#dbContext.getValues(Tables.ACTIVITYLOG);
			if (!this.#message.Filter) {
				let paginateData = SharedService.paginate(
					activityLogs,
					this.#message.Page,
					20,
				);
				resObj.success = paginateData;
				return resObj;
			}

			let filteredList = activityLogs.filter(log => {
				// Filter by name
				if (this.#message.Filter.name !== "") {
					const userName = log.User.toLowerCase() || "";

					if (!userName.includes(this.#message.Filter.name)) {
						return false;
					}
				}

				// Filter by timestamp
				if (this.#message.Filter.startDate && this.#message.Filter.endDate) {
					const logTimestamp = new Date(log.TimeStamp);
					const startTimestamp = new Date(this.#message.Filter.startDate);
					const endTimestamp = new Date(this.#message.Filter.endDate);
					endTimestamp.setDate(endTimestamp.getDate() + 1);

					if (logTimestamp < startTimestamp || logTimestamp > endTimestamp) {
						return false;
					}
				}

				// Filter by type
				if (this.#message.Filter.type !== "ALL") {
					if (this.#message.Filter.type !== "") {
						const logType = log.ActivityType || "";

						if (logType !== this.#message.Filter.type) {
							return false;
						}
					}
				}

				return true;
			});

			let paginateData = SharedService.paginate(
				filteredList,
				this.#message.Page,
				20,
			);
			resObj.success = paginateData;
			return resObj;
		} catch (error) {
			throw new ErrorResponseDto(this.#message, 0, "Error in fetching logs.", error, ErrorCodes.DEFAULT, new LoggingInfo(LogTypes.ERROR, LogMessages.ERROR.GET_ACTIVITY_LOGS_ERROR,error.message, Date.now()));
		} finally {
			this.#dbContext.close();
		}
	}
}
