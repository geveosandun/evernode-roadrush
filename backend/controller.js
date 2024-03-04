import { ServiceTypes } from "./Constants/ServiceTypes";
import { AuthService } from "./Services/Common.Services/Auth.service";
import { ContractUpdateController } from "./Controllers/ContractUpdate.Controller";
import { TestController } from "./Controllers/Test.Controller";
import { AuthenticationController } from "./Controllers/Authentication.Controller";
import { PassengerController } from "./Controllers/Passenger.Controller";
import { DriverController } from "./Controllers/Driver.Controller";

const settings = require("./settings.json").settings;

export class Controller {
	dbPath = settings.dbPath;

	#contractController = null;
	#testController = null;
	#authenticationController = null;
	#passengerController = null;
	#driverController = null;

	async handleRequest(user, message, isReadOnly) {
		this.#contractController = new ContractUpdateController(message);
		this.#testController = new TestController(message); // For test purposes
		this.#authenticationController = new AuthenticationController(message);
		this.#passengerController = new PassengerController(message);
		this.#driverController = new DriverController(message);
		let _authService = new AuthService();

		let result = {};

		if (message.Service == ServiceTypes.CONTRACT_UPDATE) {
			const verification = _authService.verifyContractUpdateRequest(message);
			if (verification.isVerified) {
				result = await this.#contractController.handleRequest();
			} else {
				result = { error: verification.reason ?? "Authentication failed." };
			}
		} else {
			if (message.Service == ServiceTypes.TEST) {
				result = await this.#testController.handleRequest();
			}
			if (message.Service === ServiceTypes.AUTHENTICATION) {
				result = await this.#authenticationController.handleRequest();
			}
			if (message.Service === ServiceTypes.PASSENGER) {
				result = await this.#passengerController.handleRequest();
			}
			if (message.Service === ServiceTypes.DRIVER) {
				result = await this.#driverController.handleRequest();
			}
		}

		if (isReadOnly) {
			await this.sendOutput(user, result);
		} else {
			await this.sendOutput(
				user,
				message.promiseId ? { promiseId: message.promiseId, ...result } : result,
			);
		}
	}

	sendOutput = async (user, response) => {
		await user.send(response);
	};
}
