import sasService from "./service/sasService"
import * as adapterLogs from 'h54s/src/logs'
import {sasResponse} from "../sasResponse.enum";


export const getResponseData = (response) => {
    return {
        [sasResponse.LOG_MESSAGE]: response.logmessage || '',
        [sasResponse.STATUS]: response.status || '',
        [sasResponse.USER_MESSAGE]: response.usermessage || '',
        [sasResponse.EXECUTING_PID]: response.executingPid || null,
        [sasResponse.REQUESTING_USER]: response.requestingUser || '',
        [sasResponse.REQUESTING_PERSON]: response.requestingPerson || '',
        [sasResponse.SAS_DATETIME]: response.sasDatetime || null,
    }
}

export const sasApi = async (servicePath, serviceName, tables) => {
    try{
        let response = await sasService.call(servicePath, tables)
        console.log(response)
        if (typeof response === 'string') { response = JSON.parse(response)}
        if (response.status !== 'success') {
            throw response;
        }
        return response
    }
    catch (error) {
        if (error instanceof Error){
            console.log(error)
            throw {logmessage: error.message, usermessage:error.type, type: error.type, status: error.status || 'fail'}
        }
        console.log(error)
        const {error_data} = error
        throw { error_data }
    }
}

export const setServiceDebug = (debugMode) => {
    sasService.setDebugMode(debugMode)
}

export const getServiceDebug = () => {
    return sasService.getDebugMode()
}

export const getServiceLogs = () => {
    return adapterLogs.get.getAllLogs()
}

export const getShouldLogin = () => {
    return sasService.getShouldLogin()
}

export const serviceClearAllLogs = () => {
    adapterLogs.clear.clearAllLogs()
}

export const getLoginUrl = () => {
    return sasService.getLoginUrl()
}