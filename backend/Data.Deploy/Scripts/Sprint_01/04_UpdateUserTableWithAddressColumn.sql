ALTER TABLE Users
ADD COLUMN XRPAddress TEXT;

ALTER TABLE Users
DROP COLUMN PublicKey;

INSERT INTO Users (Username, Password, XRPAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('MahinshaUser', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'rU36HrHxZ3xHvgPZQ4vTUxssxbqmgan2cU', 'test@gmail.com', CURRENT_TIMESTAMP, 'Seeded', CURRENT_TIMESTAMP, 'Seeded');
INSERT INTO Users (Username, Password, XRPAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('MahinshaDriver', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'rJWsLwA4AMcpWH5dtxfzG6rMH9mam3yFjw', 'test@gmail.com', CURRENT_TIMESTAMP, 'Seeded', CURRENT_TIMESTAMP, 'Seeded');
INSERT INTO Users (Username, Password, XRPAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Thisuri', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'raFsoKbamLTadyLA7mVbKkKv47B2ATmqRj', 'test@gmail.com', CURRENT_TIMESTAMP, 'Seeded', CURRENT_TIMESTAMP, 'Seeded');
INSERT INTO Users (Username, Password, XRPAddress, Email, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy) 
					VALUES ('Gayanthrika', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'rpXDdqSYwtJTiSbSM88NyUp2rRmWjftD2V', 'test@gmail.com', CURRENT_TIMESTAMP, 'Seeded', CURRENT_TIMESTAMP, 'Seeded');
