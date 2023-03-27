import { IFavoriteItem } from "@models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { localStorageService } from "@services"

type stateTypes = {
    favoriteItems:IFavoriteItem[]
}
const FAVORITE_KEY ="favorite-key"
const initialState:stateTypes = {
    favoriteItems:typeof window !== 'undefined' ? JSON.parse( localStorageService.getElemByKey(FAVORITE_KEY) ?? "[]"):[],
}

const favouritesSlice = createSlice({
    name:"favorites",
    initialState,
    reducers:{
        addToFavorite(state,action:PayloadAction<IFavoriteItem>){
            const isInCart = state.favoriteItems.findIndex((f)=>f.name === action.payload.name)
            console.log(isInCart)
            if(isInCart == -1 ){
                state.favoriteItems.push(action.payload)
                localStorageService.saveState(FAVORITE_KEY,state.favoriteItems)

            }else{
                state.favoriteItems =  state.favoriteItems.filter((f)=>f.name !== action.payload.name)
                localStorageService.saveState(FAVORITE_KEY,state.favoriteItems)
            }
        },
        removeFavItem(state,action:PayloadAction<string>){
            console.log(action.payload)
            state.favoriteItems =  state.favoriteItems.filter((f)=>f.name !== action.payload);
            localStorageService.saveState(FAVORITE_KEY,state.favoriteItems)
            
        },
        
    }
})
export const favoriteActions = favouritesSlice.actions
export const favoriteReducer = favouritesSlice.reducer
