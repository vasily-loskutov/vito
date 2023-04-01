
import { createApi } from "@reduxjs/toolkit/query/react"
import { IStoryGoodItem, IError, IErrorData } from '@models'
import { HYDRATE } from 'next-redux-wrapper'
import baseQueryWithReauth from "../baseQueryWithReAuth/baseQueryWithReAuth"
type IResp = {
  goods: IStoryGoodItem[]
}
export const storyBuyApi = createApi({
  reducerPath: "storyBuyApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['StoryGood'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: builder => ({
    saveStoryGoods: builder.mutation<IResp, IStoryGoodItem>({
      query: (payload: IStoryGoodItem) => ({
        url: `/goods/purchased`,
        method: 'POST',
        body: payload,

      }),

      invalidatesTags: ['StoryGood'],
      transformErrorResponse(response: IError): IErrorData {
        return response.data
      },

    }),
    getStoryGoods: builder.query<IStoryGoodItem[], string>({
      query: (userId: string) => ({
        url: `/goods/purchased/${userId}`,

      }),
      providesTags: ['StoryGood'],
      transformResponse(response: IResp) {
        return [...response.goods]
      },

      transformErrorResponse(response: IError): IErrorData {
        return response.data
      },

    }),
  })
})
export const { useSaveStoryGoodsMutation, useGetStoryGoodsQuery } = storyBuyApi
export default storyBuyApi
