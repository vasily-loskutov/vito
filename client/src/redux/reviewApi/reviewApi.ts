import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IReview } from '@models'
import { HYDRATE } from 'next-redux-wrapper'

import config from "@config"
type Response={
  reviews:IReview[]
}
export const reviewApi = createApi({
    reducerPath:"reviewApi",
    baseQuery: fetchBaseQuery({baseUrl:config.baseURL, credentials:"include"}),
    tagTypes: ['Review'],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
    endpoints:builder=>({
      getReview:builder.query<IReview[],string>({
        query: (goodId) => ({
            url: `/review/${goodId}`,
          
          }),
          providesTags: ['Review'],
          transformResponse(response:Response){
            return [...response.reviews]
          },
    }),
    getUserReview:builder.query<IReview[],string>({
      query: (userId) => ({
          url: `/review/user/${userId}`,
        
        }),
        providesTags: ['Review'],
        transformResponse(response:Response){
          return [...response.reviews]
        },
  }),
    createReview:builder.mutation<IReview[],IReview>({
        query: (payload:IReview) => ({
            url: `/review`,
            method:"POST",
            body:payload
          }),
          invalidatesTags: ['Review'],
    }),
        updateReview:builder.mutation<IReview,IReview>({
            query: (payload:IReview) => ({
                url: `/review`,
                method: 'PATCH',
                body: payload,
              }),
              invalidatesTags: ['Review'],
        }),
        deleteReview:builder.mutation<IReview,string>({
            query: (id:string) => ({
                url: `/review/${id}`,
                method: 'DELETE',
                
              }), 
              invalidatesTags: ['Review'],
        }),
    })
})
export const  {useCreateReviewMutation, useDeleteReviewMutation, useGetReviewQuery, useUpdateReviewMutation,useGetUserReviewQuery} = reviewApi
export default reviewApi
