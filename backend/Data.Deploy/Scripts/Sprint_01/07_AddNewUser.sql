INSERT INTO Users (Username, Password, XRPAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('GayanthrikaDriver', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'rp9ZmVhoDGCm4YDJTUcisWWnc8WT1ukbdf', 'test@gmail.com', CURRENT_TIMESTAMP, 'Seeded', CURRENT_TIMESTAMP, 'Seeded');

INSERT INTO Drivers (UserID, DriverLicenseNumber, VehicleMake, VehicleModel, VehiclePlateNumber, DriverRating, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
VALUES (7, 'DL654325', 'Honda', 'Accord', 'XYZ789', 4.2, CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin');

INSERT INTO Passengers (UserID, PaymentMethod, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
VALUES (7, 'EVR', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin');