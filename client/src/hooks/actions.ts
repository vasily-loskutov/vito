import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartActions, favoriteActions, userActions,categoriesActions } from "@redux";


const actions = {
    ...cartActions,
    ...favoriteActions,
    ...userActions,
    ...categoriesActions
}
const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}
export default useActions
