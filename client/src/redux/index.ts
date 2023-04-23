import { wrapper, makeStore, AppStore } from "./store";
import type { AppState } from "./store"
import { cartActions } from "./cartApi/cart.slice";
import {
    goodsApi, useGetGoodQuery, useLazySearchQuery, useCreateGoodMutation, useGetGoodsQuery,
    useUpdateGoodMutation, useDeleteGoodMutation, useSearchQuery, useSearchByCategoryMutation
} from "./goodsApi/goodsApi";
import {
    useLogInMutation, useRegisterMutation,
    useLogOutMutation, useRefreshQuery, useGetUsersQuery,
    useUserUpdateMutation, useDeleteUserMutation
} from "./authApi/authApi";
import authApi from "./authApi/authApi";
import { favoriteActions } from "./favoritesApi/favorites.slice";
import reviewApi, {
    useGetReviewQuery, useCreateReviewMutation,
    useDeleteReviewMutation, useUpdateReviewMutation, useGetUserReviewQuery
} from "./reviewApi/reviewApi";
import { useSaveStoryGoodsMutation, useGetStoryGoodsQuery, storyBuyApi, } from "./storyBuy/storyBuyApi";
import { userActions } from "./authApi/user.slice";

import { useCreateCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation } from "./categoryApi/categoryApi";
export {
    wrapper, goodsApi, makeStore, cartActions,
    favoriteActions, authApi, useGetUsersQuery,
    useLogInMutation, useRegisterMutation, useLogOutMutation,
    useRefreshQuery, useUserUpdateMutation, userActions,
    useSaveStoryGoodsMutation, useGetStoryGoodsQuery, storyBuyApi,
    useGetReviewQuery, useCreateReviewMutation, useDeleteReviewMutation,
    useUpdateReviewMutation, reviewApi, useGetUserReviewQuery,
    useGetGoodQuery, useLazySearchQuery, AppState, useDeleteUserMutation,
    useCreateGoodMutation, useGetGoodsQuery, useUpdateGoodMutation,
    useDeleteGoodMutation, useSearchQuery, useCreateCategoryMutation, useGetCategoriesQuery,
    useDeleteCategoryMutation, useUpdateCategoryMutation, useSearchByCategoryMutation
}
export type { AppStore }
