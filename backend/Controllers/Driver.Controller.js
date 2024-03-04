import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { DriverService } from "../Services/Domain.Services/Driver.service";

export class DriverController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new DriverService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'GetRideRequests':
                    return await this.#service.getRideRequests();
                case 'AcceptRide':
                    return await this.#service.acceptRide();
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            } 
        } catch (error) {
            return { error: error };
        }
    }
}