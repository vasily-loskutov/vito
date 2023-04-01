import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartActions, favoriteActions, userActions } from "@redux";


const actions = {
    ...cartActions,
    ...favoriteActions,
    ...userActions,

}
const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}
export default useActions
