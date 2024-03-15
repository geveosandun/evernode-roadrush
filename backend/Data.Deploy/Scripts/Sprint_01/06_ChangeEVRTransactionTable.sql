DROP TABLE IF EXISTS EvrsTransactions;

CREATE TABLE IF NOT EXISTS EvrsTransactions(
				ID INTEGER PRIMARY KEY,
				FromAddress TEXT,
				ToAddress TEXT,
				Amount TEXT,
				TransactionStatus TEXT,
				TransactionID TEXT,
				PayloadID TEXT,
				RideRequestID INTEGER,
				RequestStatus TEXT,
				CreatedDate TEXT,
				UpdatedDate TEXT,
				FOREIGN KEY (RideRequestID) REFERENCES RideRequests(RideRequestID));