import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {sasReducer} from "./sasReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    sas: sasReducer,
})