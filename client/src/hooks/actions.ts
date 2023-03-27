import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartActions,favoriteActions } from "@redux";
import { userActions } from "@redux";
import {storyBuySliceActions} from "@redux"
const actions={
    ...cartActions,
    ...favoriteActions,
    ...userActions,
    ...storyBuySliceActions
}
const useActions = ()=>{
    const dispatch = useDispatch();
    return bindActionCreators(actions,dispatch)
}
export default useActions
