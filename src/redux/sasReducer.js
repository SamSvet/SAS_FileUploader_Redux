import {
    SAS_TYPE,
    SAS_RESPONSE,
    STARTUP_RESPONSE,
    SAS_SERVICE,
    SELECTCHECKS_RESPONSE,
    UPLOAD_RESPONSE,
    CHECK_RESPONSE, LOAD_RESPONSE
} from "./types";
import {getServiceLogs} from "./api/sasApi";

const initialState = {
    [SAS_SERVICE.STARTUP.NAME]:       { data:[{...STARTUP_RESPONSE}], ...SAS_RESPONSE },
    [SAS_SERVICE.SELECT_CHECKS.NAME]: { data:[{...SELECTCHECKS_RESPONSE}], ...SAS_RESPONSE },
    [SAS_SERVICE.LOAD.NAME]:          { data:[{...LOAD_RESPONSE}], ...SAS_RESPONSE },
    [SAS_SERVICE.CHECK_DATA.NAME]:    { data:[{...CHECK_RESPONSE}], ...SAS_RESPONSE },
    [SAS_SERVICE.UPLOAD.NAME]:        { data:[{...UPLOAD_RESPONSE}], preview_data:[{col:'val'},{col:'val'}],  ...SAS_RESPONSE },
    logs: { sasErrors: [], applicationLogs: [], debugData: [], failedRequests: []},
    shouldLogin: false,
}

export const sasReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAS_TYPE.STARTUP_MERGE:
            return {...state, startupService: {...state.startupService, ...action.payload}, }
        case SAS_TYPE.STARTUP_OVERRIDE:
            return {...state, startupService: {...action.payload}}
        case SAS_TYPE.SELECT_MERGE:
            return {...state, selectChecks: {...state.selectChecks, ...action.payload}}
        case SAS_TYPE.SELECT_OVERRIDE:
            return {...state, selectChecks: {...action.payload}}
        case SAS_TYPE.UPLOAD_MERGE:
            return {...state, uploadService: {...state.uploadService, ...action.payload}}
        case SAS_TYPE.UPLOAD_OVERRIDE:
            return {...state, uploadService: {...action.payload}}
        case SAS_TYPE.CHECK_MERGE:
            return {...state, checkData: {...state.checkData, ...action.payload}}
        case SAS_TYPE.CHECK_OVERRIDE:
            return {...state, checkData: {...action.payload}}
        case SAS_TYPE.LOAD_MERGE:
            return {...state, loadData: {...state.loadData, ...action.payload}}
        case SAS_TYPE.LOAD_OVERRIDE:
            return {...state, loadData: {...action.payload}}
        case SAS_TYPE.SET_LOGS:
            return {...state, logs: getServiceLogs()}
        case SAS_TYPE.CLEAR_LOGS:
            return {...state, logs: { ...initialState.logs}}
        case SAS_TYPE.SET_SHOULD_LOGIN:
            return {...state, shouldLogin: action.payload}
        default: return state
    }
}