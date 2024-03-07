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

-- INSERT INTO RideRequests (DriverID, PassengerID, PickupLocation, Destination, PickUpAddress, DestinationAddress, Distance, Price, RideDateTime, RequestStatus, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy)
-- VALUES 
--     (1, 1, 'LocationA', 'DestinationA', 'AddressA', 'DestinationAddressA', '10 miles', '20', '2024-03-07 08:00:00', 'PENDING', '2024-03-07', 'admin', '2024-03-07', 'admin')
