import { IUser, IAuthResponse, IUserInfo } from "@models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { localStorageService } from "@services"

type stateTypes = {
    user: IUser;
    isAuth: boolean
}
const USER_KEY = "user-key"
const STATUS_KEY = "status"
const initialState: stateTypes = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorageService.getElemByKey(USER_KEY) ?? "{}") : {},
    isAuth: typeof window !== 'undefined' ? JSON.parse(localStorageService.getElemByKey(STATUS_KEY) ?? "false") : false,

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn(state, action: PayloadAction<IAuthResponse>) {

            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);
        },
        registration(state, action: PayloadAction<IAuthResponse>) {
            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);
        },
        updateUser(state, action: PayloadAction<IUserInfo>) {
            state.user = action.payload;
            localStorageService.saveState(USER_KEY, state.user);
        },
        checkAuth(state, action: PayloadAction<IAuthResponse>) {
            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);
        },
        logOut(state) {
            state.user = {} as IUser;
            localStorageService.removeElement("token")
            state.isAuth = false;

            localStorageService.saveState(USER_KEY, state.user);
            localStorageService.saveState("status", state.isAuth);
        },


    }
})
export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
