export interface ErrorResponseDto {
    request: {
        action: string;
        service: string;
    };
    errorCode: number;
    debugPoint: number;
    displayErrorMessage: string;
    thrownError: any;
    activityLogRecord: LoggingInfo | null;
}

export interface LoggingInfo {
    ActivityType: string;
    Message: any;
    ExceptionMessage: any;
    TimeStamp: Date;
}