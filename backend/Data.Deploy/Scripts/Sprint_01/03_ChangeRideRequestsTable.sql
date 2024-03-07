DROP TABLE IF EXISTS RideRequests;
CREATE TABLE IF NOT EXISTS RideRequests(
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
				FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID));