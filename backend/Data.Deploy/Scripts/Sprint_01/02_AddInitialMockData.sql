INSERT INTO Users (Username, Password, WalletAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestUser', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', 'rBA7Fytwtgb9FWGmqtQK5jfU12kjvLsURV', 'testuser@gmail.com', CURRENT_TIMESTAMP, 'TestUser', CURRENT_TIMESTAMP, 'TestUser');
INSERT INTO Users (Username, Password, WalletAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestDriver', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'rPXTMEZpbg8A8gESyJg6KtYa2kLQK2PuXu', 'testdriver@gmail.com', CURRENT_TIMESTAMP, 'TestDriver', CURRENT_TIMESTAMP, 'TestDriver');

INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
       				VALUES ('driver', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('passenger', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('admin', CURRENT_TIMESTAMP, 'admin', NULL, NULL);