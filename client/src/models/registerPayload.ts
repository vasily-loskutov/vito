import type { ILogInPayload } from "./logInPayload";

export interface IRegisterPayload extends ILogInPayload{
    name:string
}
