import { TestService } from "../Services/Domain.Services/Test.service";
import { ActivityLogService } from "../Services/Common.Services/ActivityLog.Service";
import { LogTypes } from "../Constants/LogTypes";
import { LogMessages } from "../Constants/LogMessages";

export class TestController {
    #message = null;
    #service = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#service = new TestService(message);
        this.#activityLogger = new ActivityLogService(message);
    }

    async handleRequest() {
        try {
            switch (this.#message.Action) {
                case 'Test1':
                    return await this.#service.test1();
                case 'Test2':
                    return await this.#service.test2();
                default:
                    await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.ACTION_NOT_FOUND,LogMessages.ERROR.ACTION_NOT_FOUND);
                    break;
            }

        } catch (error) {
            // await this.#activityLogger.writeLog(LogTypes.ERROR, LogMessages.ERROR.CONTROLLER_FILE_ERROR, "Error in Test.Controller.js");
            return { error: error };
        }
    }

}