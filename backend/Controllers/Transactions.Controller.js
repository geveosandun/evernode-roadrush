import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { TransactionService } from "../Services/Domain.Services/Transaction.service";

export class TransactionController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new TransactionService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'Add':
                    return await this.#service.addTransaction();
                case 'Get':
                    return await this.#service.getTransactions();
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            } 
        } catch (error) {
            return { error: error };
        }
    }
}