import { ContractUpdateService } from "../Services/Domain.Services/ContractUpdate.service";
import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { LogTypes } from "../Constants/LogTypes";
import { LogMessages } from "../Constants/LogMessages";

export class ContractUpdateController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new ContractUpdateService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'UpdateContract':
                    return await this.#service.UpdateContract();
                    break;
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND, LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            }

        } catch (error) {
            // await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.CONTROLLER_FILE_ERROR, "Error in ContractUpdate.Controller.js");
            return { error: error };
        }
    }
}