export interface AuthResponseDto{
    [x: string]: any;
    SessionId: string;
    User: UserDto;
}

export interface UserDto{
    AccessLevel: string;
    ConcurrencyKey: string;
    CreatedOn: string;
    Email: string;
    Id: number;
    ImageURL: string;
    IsActive: number;
    JoinedOn: string;
    LastLogOn: string;
    LastUpdatedOn: string;
    Name: string;
    Source: string;
}