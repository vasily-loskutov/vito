import {configureStore, combineReducers, ThunkAction, Action} from "@reduxjs/toolkit"
import goodsApi from "./goodsApi/goodsApi"
import storyBuyApi from "./storyBuy/storyBuyApi";
import authApi from "./authApi/authApi";
import reviewApi from "./reviewApi/reviewApi";
import { cartReducer } from "./cartApi/cart.slice";
import { favoriteReducer } from "./favoritesApi/favorites.slice";
import { createWrapper } from "next-redux-wrapper";
import { userReducer } from "./authApi/user.slice";


const rootReducer = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
    [goodsApi.reducerPath]:goodsApi.reducer,
    [storyBuyApi.reducerPath]:storyBuyApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer,
    "user":userReducer,
    "cart":cartReducer,
    "favorite":favoriteReducer,
  
})  




export const makeStore = () =>
configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(goodsApi.middleware,authApi.middleware,storyBuyApi.middleware,reviewApi.middleware)})



export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: false})


