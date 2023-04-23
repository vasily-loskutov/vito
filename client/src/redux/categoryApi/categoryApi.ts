import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICategory,ICategoryResponse } from '@models'
import { HYDRATE } from 'next-redux-wrapper'
import config from "@config"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: config.baseURL, credentials: "include" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: builder => ({
        getCategories: builder.query<ICategory[], undefined>({
            query: () => ({
                url: `/categories`
            }),
            transformResponse: (response) => response.categories
        }),
        createCategory: builder.mutation<ICategory, ICategory>({
            query: (payload: any) => ({
                url: `/categories`,
                method: "POST",
                body: payload
            }),

        }),
        deleteCategory: builder.mutation<ICategory, number>({
            query: (id: number) => ({
                url: `/categories/${id}`,
                method: "DELETE",
              
            }),

        }),
        updateCategory: builder.mutation<ICategory, null>({
            query: (payload:ICategory) => ({
                url: `/categories/${payload.id}`,
                method: "PUT",
                body:payload,
            }),

        }),
    })

})
export const { useCreateCategoryMutation, useGetCategoriesQuery,useDeleteCategoryMutation,useUpdateCategoryMutation } = categoryApi
export default categoryApi
