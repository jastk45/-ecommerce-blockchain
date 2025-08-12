import handleCart from './handleCart'
import walletReducer from './walletReducer'
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleCart,
    wallet: walletReducer,
})
export default rootReducers