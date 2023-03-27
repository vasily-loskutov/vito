import { createApi  } from "@reduxjs/toolkit/query/react"
import { IAuthResponse,IUser,ILogInPayload, IRegisterPayload, IError, IErrorData,IUserInfo } from '@models'
import { HYDRATE } from 'next-redux-wrapper'
import baseQueryWithReauth from "../baseQueryWithReAuth/baseQueryWithReAuth"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
    endpoints:builder=>({
        
      refresh:builder.query<IAuthResponse,undefined>({
        query: () => ({
            url: `/auth/refresh`,
          
          }),
          transformErrorResponse(response:IError):IErrorData{
            return response.data },
            
    }),
        logIn:builder.mutation<IAuthResponse,ILogInPayload>({
            query: (payload:ILogInPayload) => ({
                url: `/auth/login`,
                method: 'POST',
                body: payload,
              }),
            
              transformErrorResponse(response:IError):IErrorData{
                return response.data },
                
        }),
        register:builder.mutation<IAuthResponse,IRegisterPayload>({
          query: (payload:IRegisterPayload) => ({
              url: `/auth/registration`,
              method: 'POST',
              body: payload,
            
            }),
           
            transformErrorResponse(response:IError):IErrorData{
              return response.data 
            }
    }),
    logOut:builder.mutation<IAuthResponse,undefined>({
      query: () => ({
          url: `/auth/logout`,
          method: 'POST',
          
        }),
        transformErrorResponse(response:IError):IErrorData{
          return response.data 
        }
}),
        getUsers:builder.query<IUser[],undefined>({
          query:()=>({
              url:`/auth/users`,
          }),
          
        }),
        userUpdate:builder.mutation<IUser,IUserInfo>({
          query: (payload:IUserInfo) => ({
              url: `/auth/user`,
              method: 'PUT',
              body:payload
              
            }),
            transformErrorResponse(response:IError):IErrorData{
              return response.data 
            }
    }),

    })
})
export const  {useLogInMutation, useRegisterMutation, useLogOutMutation,useRefreshQuery,useGetUsersQuery,useUserUpdateMutation} = authApi
export default authApi
