import {SAS_SERVICE, SAS_TYPE, SERVICE_SLICE_MAP} from "./types";
import {getResponseData} from "./api/sasApi";

const getType = (serviceName) => (serviceName && SERVICE_SLICE_MAP.get(serviceName)) || {defaultState: undefined, type: undefined}

export const setResponse = (response, serviceName) => (dispatch) => {
    const {defaultState, type} = getType(serviceName)
    if (!type) return;
    dispatch( {type, payload: { ...defaultState, ...getResponseData(response), data:[...response.data]}})
}

export const setErrorResponse = (errorResponse, serviceName) => (dispatch) => {
    const {defaultState, type} = getType(serviceName)
    if (!type) return;
    dispatch( {type, payload: { ...defaultState, ...getResponseData(errorResponse)}})
}

export const setPreview = (response, serviceName) => (dispatch) => {
    if (serviceName !== SAS_SERVICE.UPLOAD.NAME) return

    dispatch( {type: SAS_TYPE.UPLOAD_MERGE, payload: { preview_data:[...response.preview_data]}})
}