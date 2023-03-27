
import { ICartItem } from "@models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { localStorageService } from "@services"
interface CartState{
    cartItems:ICartItem[],
    totalPrice:number
}

const CART_KEY:string="cart-key"
const TOTAL_PRICE_KEY:string="total-price-key"
const initialState:CartState={
    cartItems:typeof window !== 'undefined' ? JSON.parse( localStorageService.getElemByKey(CART_KEY) ?? "[]"):[],
    totalPrice:typeof window !== 'undefined' ?   JSON.parse(localStorageService.getElemByKey(TOTAL_PRICE_KEY) ?? "0"):0,
}

export const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action:PayloadAction<ICartItem>){
           const isInCart = state.cartItems.findIndex((f)=>f.name === action.payload.name)
            console.log(isInCart)
            if(isInCart == -1 ){
                state.cartItems.push(action.payload)
                state.totalPrice += +action.payload.price * +action.payload.count
                localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
                localStorageService.saveState(CART_KEY,state.cartItems)

            }else{
                state.cartItems[isInCart].count++;
                state.totalPrice = state.totalPrice + (action.payload.price * action.payload.count)
                localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
                localStorageService.saveState(CART_KEY,state.cartItems)
            }

        },
        removeCartItem(state,action:PayloadAction<string>){
            console.log(action.payload)
            
            const cartItemIdx = state.cartItems.findIndex((f)=>f.name === action.payload)
            state.totalPrice -= state.cartItems[cartItemIdx].price
            state.cartItems =  state.cartItems.filter((f)=>f.name !== action.payload)
            if(state.cartItems.length === 0){
                state.totalPrice = 0
               
            }
            localStorageService.saveState(CART_KEY,state.cartItems)
            localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
        },
        incrementCartCount(state,action:PayloadAction<string>){
            console.log(action.payload)
            const cartItemIdx = state.cartItems.findIndex((f)=>f.name === action.payload)
            console.log(cartItemIdx)
            state.cartItems[cartItemIdx].count++;
            state.totalPrice = state.cartItems.reduce((sum,obj)=>{
                return obj.price * obj.count + sum
            },0)
        
            localStorageService.saveState(CART_KEY,state.cartItems)
            localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
        },
        decrementCartCount(state,action:PayloadAction<string>){
            
            const cartItemIdx = state.cartItems.findIndex((f)=>f.name === action.payload)
            console.log(cartItemIdx)
            state.cartItems[cartItemIdx].count--;
            state.totalPrice -= state.cartItems[cartItemIdx].price
            localStorageService.saveState(CART_KEY,state.cartItems)
            localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
        },
        removeCart(state,action:PayloadAction<string>){
                state.cartItems = []
                state.totalPrice = 0
                localStorageService.saveState(CART_KEY,state.cartItems)
                localStorageService.saveState(TOTAL_PRICE_KEY,state.totalPrice)
        }
       
    }
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
