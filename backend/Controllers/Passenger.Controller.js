import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { PassengerService } from "../Services/Domain.Services/Passenger.service";

export class PassengerController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new PassengerService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'BookRide':
                    return await this.#service.bookRide();
                case 'GetCurrentRideDetails':
                    return await this.#service.gerCurrentRideDetails();        
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            } 
        } catch (error) {
            return { error: error };
        }
    }
}