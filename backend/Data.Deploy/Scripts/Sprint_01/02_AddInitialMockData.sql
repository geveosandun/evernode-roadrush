INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
		VALUES ('Thisuri', '$2y$04$X/2BWDTB5S3vjF6OSai4ke7yr3tb6IoQGLqZDmRFWCv.naQIYk5wG', 'thisuri@yopmail.com', CURRENT_TIMESTAMP, 'Thisuri', CURRENT_TIMESTAMP, 'Thisuri');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('John Doe', '$2y$04$iJvGbWMoN2wPOuV7N0bGJerpLkBVUAGABqMeZXESEphtrhtZhuPYS', 'johndoe@yopmail.com', CURRENT_TIMESTAMP, 'John Doe', CURRENT_TIMESTAMP, 'John Doe');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Alice Smith', '$2y$04$LwNc6iW8FUvhYiQs6ImR1OutH3t8GAUE2GmefUgIgebAW8pylTHP2', 'alice@yopmail.com', CURRENT_TIMESTAMP, 'Alice Smith', CURRENT_TIMESTAMP, 'Alice Smith');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Bob Johnson', '$2y$04$8DdgIH8okJrmXO5I2Jt0DecjPa.lfN3RaCxSeWmsXaeKmmovdcyza', 'bob@yopmail.com', CURRENT_TIMESTAMP, 'Bob Johnson', CURRENT_TIMESTAMP, 'Bob Johnson');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Emily Wilson', '$2y$04$YUjGX4q7bJqjdusvTdavWOeapgc9AC5veTczf8i59ZumYuqFI400y', 'emily@yopmail.com', CURRENT_TIMESTAMP, 'Emily Wilson', CURRENT_TIMESTAMP, 'Emily Wilson');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestUser', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', 'testuser@gmail.com', CURRENT_TIMESTAMP, 'TestUser', CURRENT_TIMESTAMP, 'TestUser');
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('TestDriver', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'testdriver@gmail.com', CURRENT_TIMESTAMP, 'TestDriver', CURRENT_TIMESTAMP, 'TestDriver');

INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
       				VALUES ('driver', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('passenger', CURRENT_TIMESTAMP, 'admin', NULL, NULL);
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('admin', CURRENT_TIMESTAMP, 'admin', NULL, NULL);