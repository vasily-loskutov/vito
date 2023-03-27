import {wrapper,makeStore,AppStore} from "./store";
import { cartActions } from "./cartApi/cart.slice";
import { goodsApi,useGetGoodQuery } from "./goodsApi/goodsApi";
import {useLogInMutation, useRegisterMutation,useLogOutMutation,useRefreshQuery, useGetUsersQuery,useUserUpdateMutation} from "./authApi/authApi";
import authApi from "./authApi/authApi";
import { favoriteActions } from "./favoritesApi/favorites.slice";
import reviewApi ,{ useGetReviewQuery,useCreateReviewMutation,useDeleteReviewMutation,useUpdateReviewMutation,useGetUserReviewQuery } from "./reviewApi/reviewApi";
import { useSaveStoryGoodsMutation,useGetStoryGoodsQuery,storyBuyApi } from "./storyBuy/storyBuyApi";
import { userActions } from "./authApi/user.slice";

export {
    wrapper,goodsApi,makeStore,cartActions,
    favoriteActions, authApi ,useGetUsersQuery,
    useLogInMutation,useRegisterMutation,useLogOutMutation,
    useRefreshQuery,useUserUpdateMutation,userActions,
    useSaveStoryGoodsMutation,useGetStoryGoodsQuery,storyBuyApi,
    useGetReviewQuery,useCreateReviewMutation,useDeleteReviewMutation,
    useUpdateReviewMutation,reviewApi,useGetUserReviewQuery,
    useGetGoodQuery
}
export type{AppStore}