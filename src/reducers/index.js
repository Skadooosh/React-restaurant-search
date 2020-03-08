import { combineReducers } from "redux";
import restaurantDataReducer from './restaurantDataReducer'

const rootReducer = combineReducers({
    restaurantData : restaurantDataReducer
});

export default rootReducer;
