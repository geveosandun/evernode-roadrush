DROP TABLE IF EXISTS Rides;
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


CREATE TABLE IF NOT EXISTS Rides(
				RideID INTEGER PRIMARY KEY,
				DriverID INTEGER,
				PassengerID INTEGER,
				PickupLocation TEXT,
				Destination TEXT,
				Distance TEXT,
				RideRequestId TEXT,
				RideStatus TEXT,
				RideDateTime TEXT,
				FareAmount REAL,
				CreatedDate TEXT,
				CreatedBy TEXT,
				UpdatedDate TEXT,
				UpdatedBy TEXT,
				FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
				FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID),
				FOREIGN KEY (RideRequestId) REFERENCES RideRequests(RideRequestID)

			);

