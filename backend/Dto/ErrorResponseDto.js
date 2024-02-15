export class ErrorResponseDto {
    request; // object {action, service}
    errorCode; // number
    debugPoint; // number
    displayErrorMessage; // string
    thrownError;  // string
    activityLogRecord; // object: LoggingInfo

    constructor(requestMessage, debugPoint, displayErrorMessage, thrownError, errorCode = 500,  activityLogRecord = null) {
        this.request = {
            service: requestMessage.Service,
            action: requestMessage.Action
        }
        this.errorCode = errorCode;
        this.debugPoint = debugPoint;
        this.displayErrorMessage = displayErrorMessage;
        this.thrownError = typeof thrownError === 'object' ? thrownError.toString() : typeof thrownError === 'string' ? thrownError : '*Error deserializing error*';
        this.activityLogRecord = activityLogRecord;
    }
}

export class LoggingInfo {
    ActivityType;
    Message;
    ExceptionMessage
    TimeStamp;

    constructor(ActivityType, Message, ExceptionMessage, TimeStamp) {
        this.ActivityType = ActivityType;
        this.Message = Message;
        this.ExceptionMessage = ExceptionMessage;
        this.TimeStamp = TimeStamp;
    }
}