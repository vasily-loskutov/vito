import { createApi,fetchBaseQuery  } from "@reduxjs/toolkit/query/react"
import { IGood } from '@models'
import { HYDRATE } from 'next-redux-wrapper'
import config from "@config"
export const goodsApi = createApi({
    reducerPath:"goodsApi",
    baseQuery: fetchBaseQuery({baseUrl:config.baseURL, credentials:"include"}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
    endpoints:builder=>({
        getGoods:builder.query<IGood[],undefined>({
            query:()=>({
                url:`/goods`
            })
            
        }),
   
        getGood:builder.query<IGood,string>({
            query:(goodId)=>({
                url:`/goods/${goodId}`
            }),
            transformResponse:(response:Array<IGood>)=>response[0]
        }),
      
    })
})
export const {useGetGoodQuery} = goodsApi
export default goodsApi
