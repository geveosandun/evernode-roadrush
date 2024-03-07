import { SharedService } from "../Services/Common.Services/SharedService";
import { Tables } from "../Constants/Tables";

const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const settings = require("../settings.json").settings;

export class DBInitializer {
	static #db = null;

	static async init() {
		// If database does not exist. (In an initial run)
		if (!fs.existsSync(settings.dbPath)) {
			this.#db = new sqlite3.Database(settings.dbPath);

			// Create table StepCount
			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.CONTRACTVERSION} (
				Id INTEGER,
				Version FLOAT NOT NULL,
				Description Text,
				CreatedOn INTEGER,
				LastUpdatedOn INTEGER,
				PRIMARY KEY("Id" AUTOINCREMENT)
			)`);

			await this
				.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.SQLSCRIPTMIGRATIONS} (
				Id INTEGER,
				Sprint TEXT NOT NULL,
				ScriptName TEXT NOT NULL,
				ExecutedTimestamp TEXT, 
				ConcurrencyKey TEXT
					CHECK (ConcurrencyKey LIKE '0x%' AND length(ConcurrencyKey) = 18),
				PRIMARY KEY("Id" AUTOINCREMENT)
			)`);

			//Create table ActivityLog
			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.ACTIVITYLOG} (
				Id INTEGER,
				ActivityType TEXT,
				User TEXT,
				Service TEXT,
				Action TEXT,
				Message TEXT,
				ExceptionMessage TEXT,
				TimeStamp TEXT,
				PRIMARY KEY("Id" AUTOINCREMENT)
			)`);

			//create table User
			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.USERS} (
				UserID INTEGER PRIMARY KEY,
				Username TEXT NOT NULL,
				Password TEXT NOT NULL,
				PublicKey TEXT NOT NULL,
				Email TEXT NOT NULL,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.ROLES}(
				RoleID INTEGER PRIMARY KEY,
    			RoleName TEXT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.USERROLES}(
				UserID INTEGER,
    			RoleID INTEGER,
    			PRIMARY KEY (UserID, RoleID),
    			FOREIGN KEY (UserID) REFERENCES Users(UserID),
    			FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.DRIVERS}(
				DriverID INTEGER PRIMARY KEY,
				UserID INTEGER,
				DriverLicenseNumber TEXT,
				VehicleMake TEXT,
				VehicleModel TEXT,
				VehiclePlateNumber TEXT,
				DriverRating REAL,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (UserID) REFERENCES Users(UserID)
			)`)

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.PASSANGERS}(
				PassengerID INTEGER PRIMARY KEY,
				UserID INTEGER,
				PaymentMethod TEXT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (UserID) REFERENCES Users(UserID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.RIDES}(
				RideID INTEGER PRIMARY KEY,
				DriverID INTEGER,
				PassengerID INTEGER,
				PickupLocation TEXT,
				Destination TEXT,
				RideStatus TEXT,
				RideDateTime TEXT,
				FareAmount REAL,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
				FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.PAYMENTS}(
				PaymentID INTEGER PRIMARY KEY,
				RideID INTEGER,
				PaymentType TEXT,
				Amount REAL,
				PaymentDateTime TEXT,
				PaymentStatus TEXT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (RideID) REFERENCES Rides(RideID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.LOCATIONS}(
				LocationID INTEGER PRIMARY KEY,
				Name TEXT,
				Latitude REAL,
				Longitude REAL,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.RIDEREQUESTS}(
				RideRequestID INTEGER PRIMARY KEY,
				DriverID INTEGER,
				PassengerID INTEGER,
				PickupLocation TEXT,
				Destination TEXT,
				PickUpAddress TEXT,
				DestinationAddress TEXT,
				Distance TEXT,
				Price TEXT,
				RideDateTime TEXT,
				RequestStatus TEXT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
				FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.WALLETS}(
				WalletId INTEGER PRIMARY KEY,
				UserID TEXT,
				BalanceInEvrs FLOAT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (UserID) REFERENCES Users(UserID)
			)`);

			await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.EVERSTRANSACTIONS}(
				TransactionID INTEGER PRIMARY KEY,
				UserID INTEGER,
				EvrsAmount REAL,
				CashAmount REAL,
				TransactionType TEXT, 
				TransactionDateTime TEXT,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (UserID) REFERENCES Users(UserID)
			)`);

			this.#db.close();
		}

		/* =========================================
			Section 1: SQL Script files runner
		 ========================================== */

		// If the database file exists (in first round and all)
		if (fs.existsSync(settings.dbPath)) {
			this.#db = new sqlite3.Database(settings.dbPath);

			// Get the last executed sprint folder name from the database
			const getLastExecutedSprintQuery =
				"SELECT Sprint FROM SqlScriptMigrations ORDER BY Sprint DESC LIMIT 1";
			let rc = await this.#getRecord(getLastExecutedSprintQuery);
			const lastExecutedSprint = rc ? rc.Sprint : "Sprint_00";

			// Get a list of all script folders in the specified order
			const scriptFolders = fs
				.readdirSync(settings.dbScriptsFolderPath)
				.filter(
					folder =>
						folder.startsWith("Sprint_") && folder >= lastExecutedSprint,
				)
				.sort();

			for (const sprintFolder of scriptFolders) {
				const sprintFolderPath = path.join(
					settings.dbScriptsFolderPath,
					sprintFolder,
				);

				// Get a list of SQL script files in the current folder
				const sqlFiles = fs
					.readdirSync(sprintFolderPath)
					.filter(file => file.match(/^\d+_.+\.sql$/))
					.sort();

				for (const sqlFile of sqlFiles) {
					const scriptPath = path.join(sprintFolderPath, sqlFile);
					//const scriptName = sqlFile.replace(/^\d+_(.+)\.sql$/, '$1');

					// Check if the script has been executed before
					const query =
						"SELECT * FROM SqlScriptMigrations WHERE Sprint = ? AND ScriptName = ?";
					const rc = await this.#getRecord(query, [sprintFolder, sqlFile]);
					if (!rc) {
						// If the script not found
						const sqlScript = fs.readFileSync(scriptPath, "utf8");
						const sqlStatements = sqlScript
							.split(";")
							.filter(statement => statement.trim() !== "");
						for (const statement of sqlStatements) {
							await this.#runQuery(statement);
						}

						const insertQuery =
							"INSERT INTO SqlScriptMigrations (Sprint, ScriptName, ExecutedTimestamp) VALUES (?, ?, ?)";
						await this.#runQuery(insertQuery, [
							sprintFolder,
							sqlFile,
							SharedService.getCurrentTimestamp(),
						]);

						console.log(`Executed script: ${scriptPath}`);
					} else {
						// If the script found
						// console.log(`Skipped already executed script: ${scriptPath}`);
					}
				}
			}

			this.#db.close();
		}
	}

	static #runQuery(query, params = null) {
		return new Promise((resolve, reject) => {
			this.#db.run(query, params ? params : [], function (err) {
				if (err) {
					reject(err);
					return;
				}

				resolve({ lastId: this.lastID, changes: this.changes });
			});
		});
	}

	static #getRecord(query, filters = []) {
		// Execute the query and return the result
		return new Promise((resolve, reject) => {
			if (filters.length > 0) {
				this.#db.get(query, filters, (err, row) => {
					if (err) {
						console.error(err.message);
						reject(err.message);
					} else {
						resolve(row);
					}
				});
			} else {
				this.#db.get(query, (err, row) => {
					if (err) {
						console.error(err.message);
						reject(err.message);
					} else {
						resolve(row);
					}
				});
			}
		});
	}
}
