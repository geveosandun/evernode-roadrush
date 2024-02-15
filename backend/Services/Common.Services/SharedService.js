const { v4: uuidv4 } = require("uuid");
const EventEmitter = require("events");

export class SharedService {
	static context = null;
	static nplEventEmitter = new EventEmitter();

	static extractAndGenerateRandomNumber(text) {
		// Extract all the numbers from the text using a regular expression
		const numbersArray = text.match(/\d+/g);

		const intArray = numbersArray.map((number) => parseInt(number, 10));

		// Combine the extracted numbers into a single number
		const total = intArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		const totalLength = total.toString().length;

		// Generate a random number with a length between 4 to 7 digits
		const minDigits = 4;
		const maxDigits = 7;
		const randomLength =
			Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;

		const randomNumberLength = (totalLength > randomLength) ? randomLength : totalLength;

		let randomNumber = "";
		for (let i = 0; i < randomNumberLength; i++) {
			const digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
			randomNumber += digit.toString();
		}
		return parseInt(randomNumber, 10);
	}

	/**
	 *
	 * @param seed
	 * @param min
	 * @param max
	 * @returns a number
	 */
	static generateSeededRandom(seed, min, max) {
		seed = ((seed % 1e10) + 1e10) % 1e10;
		let num = Math.sin(seed) * 10000;
		num -= Math.floor(num);
		let random = Math.floor(num * (max - min + 1)) + min;

		return random;
	}

	static generateUUID() {
		return uuidv4();
	}

	/**
	 * Convert unix timestamps to ISO8601 format. (eg: '2023-10-04T05:59:42.384Z' )
	 * @param milliseconds Number
	 * @returns {string} Timestamp string
	 */
	static getUtcISOStringFromUnixTimestamp(milliseconds) {
		const date = new Date(milliseconds);

		// Formatting the date in standard UTC format (2023-10-04T05:59:42.384Z')
		const utcDateString = date.toISOString();
		return utcDateString;
	}

	/**
	 * Current context timestamp in ISO format. ( eg: '2023-10-04T05:59:42.384Z' )
	 * @returns {string}
	 */
	static getCurrentTimestamp() {
		return this.getUtcISOStringFromUnixTimestamp(this.context.timestamp);
	}

	static generateConcurrencyKey() {
		const timestamp = this.getCurrentTimestamp();
		const extractedTimestamp = timestamp.replace(/\D/g, ''); // Extract numeric characters

		// Convert extracted timestamp to hexadecimal and pad to 14 characters
		const timestampHex = Number(extractedTimestamp).toString(16).toUpperCase().padStart(14, "0");

		// Calculate the checksum based on the length of the hexadecimal string
		const checksum = 16 - timestampHex.length;

		// Add checksum to the beginning of the hexadecimal string and prefix with "0x"
		const concurrencyKey = `0x${'0'.repeat(checksum)}${timestampHex}`;

		return concurrencyKey;
	}

	/**
	 * Paginates Data.
	 * @param data Array
	 * @param page Number
	 * @param perPage Number
	 * @returns {Object}
	 */
	static paginate(data, page, perPage) {
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedData = data.slice(startIndex, endIndex);
		return {
			data: paginatedData,
			page,
			totalPages: Math.ceil(data.length / perPage),
		};
	}

	static objectArraySort = (arrayObj, fieldName) => {
		if(arrayObj.length > 0 ){
			return arrayObj.sort((ob1, ob2) => {
				const text1 = ob1[fieldName].toLowerCase();
				const text2 = ob2[fieldName].toLowerCase();

				if (text1 < text2) {
					return -1;
				}
				if (text1 > text2) {
					return 1;
				}
				return 0;
			});
		}
		return arrayObj;
	}
}
