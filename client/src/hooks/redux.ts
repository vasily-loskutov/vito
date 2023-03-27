import {TypedUseSelectorHook,useSelector} from "react-redux"
import { AppStore } from "@redux"
const useAppSelector:TypedUseSelectorHook<AppStore>=useSelector
export default useAppSelector
