import { SharedService } from "./SharedService";
import { EventTypes } from "../../Constants/EventTypes";

const axios = require("axios")

export class HttpRequester {

    /**
     *
     * @param url :- URL of the request
     * @param requestType  :- A value from constant HttpRequestTypes
     * @param context :- Contract ctx
     * @param eventListener
     * @param nodeKey :- A select node's public key.
     * @param options :- Http Request options ex: {params: {}, headers: {}, auth: {}, responseType: ''arraybuffer'| 'document'| 'json'| 'text'| 'stream''  }
     * @returns {Promise<AxiosResponse>}  In the form of {status: 200, statusText: 'OK', data: {} }
     *
     * For more: https://axios-http.com/docs/intro
     */
    async request(url, requestType, context, eventListener, nodeKey, options = null) {
        const config = {
            method: requestType,
            url: url
        }

        if (options) {
            if (options.params) {
                config.params = options.params;
            }
            if (options.headers) {
                config.headers = options.headers;
            }
            if (options.auth) {
                config.auth = options.auth;
            }
            if (options.responseType) {
                config.responseType = options.responseType;
            }
            if (options.data) {
                config.data = options.data;
            }
        }

        let httpResponse = null;

        // NPL Messaging
        if (context.readonly) {
            throw 'NPL messaging works only in non-readonly context.'
        } else {
            if (!nodeKey) {
                throw 'A selected node key must  be present.'
            } else {
                const hpconfig = await context.getConfig();
                // Wait only for half of roundtime.
                const timeoutMs = Math.ceil(hpconfig.consensus.roundtime / 1);
                let completed = false;

                let distributeMessages = [];

                httpResponse = await new Promise(async (resolve, reject) => {

                    // This part is only done bn one node
                    if (context.publicKey === nodeKey) {
                        console.log(`Making API request from node ${nodeKey}`);
                        const res = await axios(config);

                        await SharedService.context.unl.send(
                            JSON.stringify({
                                type: EventTypes.HTTP_RESPONSE,
                                data: res.data,
                                status: res.status,
                                statusText: res.statusText
                            })
                        );
                    }

                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        completed = true;
                        // If we've received less than what we expect, throw an error.
                        if (distributeMessages.length === 1)
                            resolve(distributeMessages[0]);
                        else
                            reject("Didn't receive any messages from any nodes");
                    }, timeoutMs);


                    eventListener.on(EventTypes.HTTP_RESPONSE, (node, msg) => {
                        const obj = JSON.parse(msg.toString());
                        distributeMessages.push(obj);
                        completed = true;
                        clearTimeout(timer);
                        resolve(obj);
                    });

                });

            }
        }

        return httpResponse;

    }

}