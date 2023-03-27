import { IUser } from "./user";

export interface IAuthResponse {
    accessToken:string;
    refreshToke:string;
    user:IUser
}
