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
                    return await this.#service.getRideRequests(this.#message.Data.userId);
                case 'AcceptRide':
                    return await this.#service.acceptRide(this.#message.Data);
                case 'GetDriversDetails':
                    return await this.#service.getDriversDetails();
                case 'GetDriverXRPAddress':
                    console.log('msgc', this.#message);
                    return await this.#service.getDriverXRPAddress();
                case 'EndTrip':
                    console.log('msgc', this.#message);
                    return await this.#service.endTrip();
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            } 
        } catch (error) {
            return { error: error };
        }
    }
}