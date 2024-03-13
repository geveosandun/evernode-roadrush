import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { UserService } from "../Services/Domain.Services/User.service";
export class UserController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new UserService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'GetRideHistory':
                    return await this.#service.getRideHistory( this.#message.Data);
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            } 
        } catch (error) {
            return { error: error };
        }
    }
}