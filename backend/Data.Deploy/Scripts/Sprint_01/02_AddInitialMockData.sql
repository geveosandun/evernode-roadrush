INSERT INTO Users (Username, Password, PublicKey, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestUser', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', 'ED2C155CD4ED3BDB0DC6DA6431EB74939A5B998E45CF7E5CC6EBFAB5FB88BB286D', 'testuser@gmail.com', CURRENT_TIMESTAMP, 'TestUser', CURRENT_TIMESTAMP, 'TestUser');
INSERT INTO Users (Username, Password, PublicKey, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestDriver', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'EDE8DC6957E8A36A01A77B30CAA1E18D67801F7D2ABB4B2DC2A3E7F2CD9767BE40', 'testdriver@gmail.com', CURRENT_TIMESTAMP, 'TestDriver', CURRENT_TIMESTAMP, 'TestDriver');

INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
       				VALUES ('driver', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('passenger', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('admin', CURRENT_TIMESTAMP, 'admin', NULL, NULL);

INSERT INTO UserRoles (UserID, RoleID) 
						VALUES (1, 2);
INSERT INTO UserRoles (UserID, RoleID) 
						VALUES (2, 1);

INSERT INTO Drivers (UserID, DriverLicenseNumber, VehicleMake, VehicleModel, VehiclePlateNumber, DriverRating, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
VALUES (2, 'DL654321', 'Honda', 'Accord', 'XYZ789', 4.2, CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin');

INSERT INTO Passengers (UserID, PaymentMethod, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
VALUES (1, 'Evrs', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin');
