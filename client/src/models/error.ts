

export interface IErrorData{
    message:string,
    errors:[string]
}

export interface IError{
    data:IErrorData
    status:number
}
