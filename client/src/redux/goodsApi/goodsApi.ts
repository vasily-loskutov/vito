import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IGood } from '@models'
import { HYDRATE } from 'next-redux-wrapper'
import config from "@config"

export const goodsApi = createApi({
    reducerPath: "goodsApi",
    baseQuery: fetchBaseQuery({ baseUrl: config.baseURL, credentials: "include" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: builder => ({
        getGoods: builder.query<IGood[], undefined>({
            query: () => ({
                url: `/goods`
            })

        }),
        search: builder.query<IGood[], string | string[]>({
            query: (message: string | string[]) => (
                {
                    url: `/goods/search`,
                    method: "POST",
                    body: { message: message },
                }),
            transformResponse: (response) => response.findGoods
        }),
        searchByCategory: builder.mutation<IGood[], any>({
            query: (payload) => (
                {
                    url: `/goods/searchByCategory`,
                    method: "POST",
                    body: payload,
                }),
            transformResponse: (response) => response.goods
        }),
        getGood: builder.query<IGood, string>({
            query: (goodId) => ({
                url: `/goods/${goodId}`
            }),
            transformResponse: (response) => response.good,

        }),
        createGood: builder.mutation<IGood, any>({
            query: (payload: any) => ({
                url: `/goods/`,
                method: "POST",
                body: payload
            }),
            transformResponse: (response: Array<IGood>) => response[0]
        }),
        updateGood: builder.mutation<IGood, any>({
            query: (payload: any) => ({
                url: `/goods/`,
                method: "PATCH",
                body: payload
            }),
            transformResponse: (response: Array<IGood>) => response[0]
        }),
        deleteGood: builder.mutation<IGood, any>({
            query: (goodId) => ({
                url: `/goods/${goodId}`,
                method: "DELETE",

            }),
            transformResponse: (response: Array<IGood>) => response[0]
        }),
    })

})
export const { useGetGoodsQuery, useGetGoodQuery, useLazySearchQuery, useSearchQuery,
    useCreateGoodMutation, useUpdateGoodMutation, useDeleteGoodMutation, useSearchByCategoryMutation } = goodsApi
export default goodsApi
