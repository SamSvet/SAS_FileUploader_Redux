import {APP_TYPE, SAS_TYPE} from "../types";
import {getServiceLogs, getShouldLogin, sasApi} from "../api/sasApi";
import {batch} from "react-redux";
import {toastrMessage} from "../../toastrMessage/toastrMessage";
import {setErrorResponse, setPreview, setResponse} from "../actions";

export const sasDispatcher = (servicePath, serviceName, tables) => {
    return async dispatch => {
        try{
            dispatch({type:APP_TYPE.SET_LOADER, payload: true})
            const response = await sasApi(servicePath, serviceName, tables)
            batch( () => {
                dispatch(setResponse(response, serviceName))
                dispatch(setPreview(response, serviceName))
            })
            toastrMessage.info(`${response.usermessage}`)
        }
        catch (errorResponse) {
            toastrMessage.error(`${errorResponse.usermessage} ${serviceName}`)
            dispatch(setErrorResponse(errorResponse, serviceName))
        }
        finally {
            batch( () => {
                dispatch({type:APP_TYPE.SET_LOADER, payload: false});
                dispatch({type:SAS_TYPE.SET_LOGS, payload: getServiceLogs()});
                dispatch({type:SAS_TYPE.SET_SHOULD_LOGIN, payload: getShouldLogin()})
            })
        }
    }
}