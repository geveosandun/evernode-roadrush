
export class DriverDto {
    DriverID;
    UserID;
	DriverLicenseNumber;
	VehicleMake;
	VehicleModel;
	VehiclePlateNumber;

	constructor(DriverID, UserID, DriverLicenseNumber, VehicleMake, VehicleModel, VehiclePlateNumber){
		this.DriverID = DriverID,
		this.UserID = UserID,
		this.DriverLicenseNumber = DriverLicenseNumber,
		this.VehicleMake = VehicleMake,
		this.VehicleModel = VehicleModel,
		this.VehiclePlateNumber = VehiclePlateNumber
	}
	

}