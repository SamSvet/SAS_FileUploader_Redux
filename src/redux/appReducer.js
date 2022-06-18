import {APP_TYPE} from "./types";

const initialState = {
    debug: false,
    loading: false,
    processCD: null,
    selectChecks: [],
    fileName: null,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_TYPE.SET_LOADER:
            return {...state, loading: action.payload}
        case APP_TYPE.SET_DEBUG:
            return {...state, debug: action.payload}
        case APP_TYPE.SET_PROCESS:
            return {...state, processCD: action.payload}
        case APP_TYPE.SET_CHECKS:
            return {...state, selectChecks: action.payload}
        case APP_TYPE.SET_FILENAME:
            return {...state, fileName: action.payload}
        default: return state
    }
}