import { EVRIssuer, LocalStorageKeys } from "../helpers/constants";
import AppSecureStorageService from "./secure-storage-service";

const xrpl = require('xrpl');

export default class XRPLService {
    private client_url = 'wss://xahau.network';

    constructor() {}

    async getAccountBalance() {
        const client = new xrpl.Client(this.client_url);
        await client.connect();

        const account = await AppSecureStorageService.getItem(LocalStorageKeys.xrpAddress);

        try {
            const response = await client.request({
                command: "account_info",
                account: account,
                ledger_index: "validated"
            })
            const balance = xrpl.dropsToXrp(response.result.account_data.Balance);
            console.log(`Balance: ${balance} XRP`);
        } catch (error) {
            console.error(`Failed to fetch account balance: ${error}`);
        } finally {
            await client.disconnect();
        }
    }

    async getTrustlineBalance() {
        // Connect to the XRPL network
        const client = new xrpl.Client(this.client_url) // Use "wss://s1.ripple.com" for mainnet
        await client.connect()
      
        // The account you want to check the trustline for
        const account = await AppSecureStorageService.getItem(LocalStorageKeys.xrpAddress);
      
        // Currency code and issuer
        const currencyCode = EVRIssuer.currencyCode;
        const issuer = EVRIssuer.address;
      
        try {
          // Request trustlines for the account
          const response = await client.request({
            command: "account_lines",
            account: account,
            ledger_index: "validated"
          })
      
          // Filter for specific trustline by currency and issuer
          const evrTrustline = response.result.lines.filter((line: any) =>
            line.currency === currencyCode && line.account === issuer
          )
      
          if (evrTrustline.length > 0) {
            // Output the trustline information
            return evrTrustline[0];
          } else {
            console.log("No trustline found for the specified currency and issuer.")
          }
      
        } catch (error) {
          console.error("Error fetching trustline information:", error)
        } finally {
          // Disconnect from the client
          await client.disconnect()
        }
    }
}