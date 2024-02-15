const settings = require("../../settings.json");
const crypto = require("crypto");

export class AuthService {
	verifyContractUpdateRequest(message) {
		let isVerified = false;
		try {
			const verify = crypto.createVerify("SHA256");
			verify.update(message.data.content.buffer);
			isVerified = verify.verify(
				settings.contractUpdatingPublicKey,
				message.signature,
				"hex",
			);
		} catch (error) {
			console.log(error);
			const response = {
				isVerified: false,
				reason: "verification failed with errors.",
			};
			return response;
		}

		const response = {
			isVerified: isVerified,
			reason: "Success",
		};

		console.log("Updated Contract Verification Successful.", response);
		return response;
	}
}
