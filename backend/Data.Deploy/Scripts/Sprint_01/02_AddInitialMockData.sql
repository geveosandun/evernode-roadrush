
	-- Mock data for Users table
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
		VALUES ('Thisuri', '$2y$04$X/2BWDTB5S3vjF6OSai4ke7yr3tb6IoQGLqZDmRFWCv.naQIYk5wG', 'thisuri@yopmail.com', DATETIME('now'), 'Thisuri', DATETIME('now'), 'Thisuri');
        -- SunnyD@y111
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('John Doe', '$2y$04$iJvGbWMoN2wPOuV7N0bGJerpLkBVUAGABqMeZXESEphtrhtZhuPYS', 'johndoe@yopmail.com', DATETIME('now'), 'John Doe', DATETIME('now'), 'John Doe');
-- SunnyD@y222
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Alice Smith', '$2y$04$LwNc6iW8FUvhYiQs6ImR1OutH3t8GAUE2GmefUgIgebAW8pylTHP2', 'alice@yopmail.com', DATETIME('now'), 'Alice Smith', DATETIME('now'), 'Alice Smith');
-- SunnyD@y333
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Bob Johnson', '$2y$04$8DdgIH8okJrmXO5I2Jt0DecjPa.lfN3RaCxSeWmsXaeKmmovdcyza', 'bob@yopmail.com', DATETIME('now'), 'Bob Johnson', DATETIME('now'), 'Bob Johnson');
-- SunnyD@y333
INSERT INTO Users (Username, Password, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Emily Wilson', '$2y$04$YUjGX4q7bJqjdusvTdavWOeapgc9AC5veTczf8i59ZumYuqFI400y', 'emily@yopmail.com', DATETIME('now'), 'Emily Wilson', DATETIME('now'), 'Emily Wilson');
-- SunnyD@y333

-- Mock data for Roles table
INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
       				VALUES ('driver', DATETIME('now'), 'admin', NULL, NULL);

INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('passenger', DATETIME('now'), 'admin', NULL, NULL);

INSERT INTO Roles (RoleName, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('admin', DATETIME('now'), 'admin', NULL, NULL);

--  Insert mock data into UserRoles table
-- INSERT INTO UserRoles (UserID, RoleID, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
-- 					VALUES (1, 'passanger', DATETIME('now'), 'admin1', NULL, NULL);


-- INSERT INTO UserRoles (UserID, RoleID, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
-- 				VALUES (2, 'driver', DATETIME('now'), 'admin1', NULL, NULL);

-- INSERT INTO UserRoles (UserID, RoleID, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
-- 				VALUES (3, 'passanger', DATETIME('now'), 'admin1', NULL, NULL);

-- INSERT INTO UserRoles (UserID, RoleID, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
-- 				VALUES (4, 'passanger', DATETIME('now'), 'admin1', NULL, NULL);

-- INSERT INTO UserRoles (UserID, RoleID, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
-- 				VALUES (5, 'driver', DATETIME('now'), 'admin1', NULL, NULL);

