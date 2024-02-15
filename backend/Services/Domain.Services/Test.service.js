import { NPLMessagingHandler } from "../Common.Services/NPLMessageHandler";
import { SharedService } from "../Common.Services/SharedService";
import DecisionFunctions from "./DecisionFunctions";
import { HttpRequester } from "../Common.Services/HttpRequester";
import { ActivityLogService } from "../Common.Services/ActivityLog.Service";
import { HttpRequestTypes } from "../../Constants/HttpRequestTypes";
import { LogTypes } from "../../Constants/LogTypes";
import { LogMessages } from "../../Constants/LogMessages";

const settings = require('../../settings.json').settings;
const { SqliteDatabase } = require("./../Common.Services/dbHandler").default;

export class TestService {
    #dbPath = settings.dbPath;
    #message = null;
    #dbContext = null;
    #activityLogger = null;

    constructor(message) {
        this.#message = message;
        this.#dbContext = new SqliteDatabase(this.#dbPath);
        this.#activityLogger = new ActivityLogService(message);
    }

    async test1() {
        let resObj = {};
        const nplMessenger = new NPLMessagingHandler();
        const httpRequester = new HttpRequester();

        try {
            const randomNumber = SharedService.extractAndGenerateRandomNumber(SharedService.context.publicKey);
            const selectedNode = await nplMessenger.sendDecisionMessage(SharedService.context, SharedService.nplEventEmitter, { key: SharedService.context.publicKey, value: randomNumber }, DecisionFunctions.getMinValue);
            const httpResponse = await httpRequester.request('https://random-data-api.com/api/v2/users', HttpRequestTypes.GET, SharedService.context, SharedService.nplEventEmitter, selectedNode.key, { params: { size: 2 } });

            console.log(httpResponse.status);
            resObj.success = httpResponse.data;

            return resObj;
        } catch (error) {
            throw error;
        }

    }

    async test2() {
        await this.#activityLogger.writeLog(LogTypes.INFO, LogMessages.SUCCESS.SUCCESS);
        console.log("Test 2 ----------------------");
        return;
    }

}
