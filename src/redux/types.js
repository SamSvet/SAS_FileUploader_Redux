import {sasResponse} from "./sasResponse.enum";

export const APP_TYPE = {
    SET_LOADER: 'APP/SET_LOADER',
    // SHOW_TOASTR: 'APP/SHOW_TOASTR',
    // HIDE_TOASTR: 'APP/HIDE_TOASTR',
    SET_DEBUG: 'APP/SET_DEBUG',
    SET_PROCESS: 'APP/SET_PROCESS',
    SET_CHECKS: 'APP/SET_CHECKS',
    SET_FILENAME: 'APP/SET_FILENAME',
}

export const SAS_TYPE = {
    STARTUP_MERGE: 'SAS/STARTUP_MERGE',
    STARTUP_OVERRIDE: 'SAS/STARTUP_OVERRIDE',
    SELECT_MERGE: 'SAS/SELECT_MERGE',
    SELECT_OVERRIDE: 'SAS/SELECT_OVERRIDE',
    UPLOAD_MERGE: 'SAS/UPLOAD_MERGE',
    UPLOAD_OVERRIDE: 'SAS/UPLOAD_OVERRIDE',
    CHECK_MERGE: 'SAS/CHECK_MERGE',
    CHECK_OVERRIDE: 'SAS/CHECK_OVERRIDE',
    LOAD_MERGE: 'SAS/LOAD_MERGE',
    LOAD_OVERRIDE: 'SAS/LOAD_OVERRIDE',
    SET_LOGS: 'SAS/SET_LOGS',
    CLEAR_LOGS: 'SAS/CLEAR_LOGS',
    SET_SHOULD_LOGIN: 'SAS/SET_SHOULD_LOGIN',
}

export const SAS_RESPONSE = {
    [sasResponse.USER_MESSAGE]: '',
    [sasResponse.LOG_MESSAGE]: '',
    [sasResponse.REQUESTING_USER]: '',
    [sasResponse.REQUESTING_PERSON]: '',
    [sasResponse.EXECUTING_PID]: null,
    [sasResponse.SAS_DATETIME]: null,
    [sasResponse.STATUS]: '',
}

export const STARTUP_RESPONSE = {
    VALUE: '',
    LABEL: '',
    CHECK_STP: '',
    LOAD_STP: '',
    SELECT_CHECKS_STP: '',
}

export const SELECTCHECKS_RESPONSE = {
    VALUE: 'value',
    LABEL: 'label',
    ISFIXED: false,
    NUM: 1,
    SHEET: '',
}

export const UPLOAD_RESPONSE = {
    OBSNUM: null,
    SASTABLENAME: '',
    SASTABLESCHEMA: '',
}

export const CHECK_RESPONSE = {
    CNT: null,
    DESC: '',
    TABLENAME: '',
    RC: null
}

export const LOAD_RESPONSE = {
    KEY:'',
    VALUE:''
}

export const SAS_SERVICE = {
    STARTUP: { NAME:'startupService', DEFAULT_PATH: '/Apps/SASFileUploader/startupService'},
    SELECT_CHECKS: {NAME: 'selectChecks', DEFAULT_PATH: '/Apps/SASFileUploader/selectChecks'} ,
    UPLOAD: {NAME: 'uploadService', DEFAULT_PATH: '/Apps/SASFileUploader/uploadService'},
    CHECK_DATA: {NAME: 'checkData', DEFAULT_PATH: '/Apps/SASFileUploader/checkData'},
    LOAD: {NAME: 'loadData', DEFAULT_PATH: '/Apps/SASFileUploader/loadData'},
    DOWNLOAD: {NAME: 'downloadService', DEFAULT_PATH: '/Apps/SASFileUploader/downloadService'},
}

const logs = {
    applicationLogs: [],
    debugData: [],
    sasErrors: [],
    failedRequests: []
};

export const getAllLogs = () => {
    return {
        sasErrors: logs.sasErrors,
        applicationLogs: logs.applicationLogs,
        debugData: logs.debugData,
        failedRequests: logs.failedRequests
    }
}

const createMapEntry = (serviceName, type, defaultState) => [serviceName, {type, defaultState}]
export const SERVICE_SLICE_MAP = new Map([
    createMapEntry(SAS_SERVICE.STARTUP.NAME, SAS_TYPE.STARTUP_OVERRIDE, { data:[{...STARTUP_RESPONSE}], ...SAS_RESPONSE }),
    createMapEntry(SAS_SERVICE.SELECT_CHECKS.NAME, SAS_TYPE.SELECT_OVERRIDE, { data:[{...SELECTCHECKS_RESPONSE}, {...SELECTCHECKS_RESPONSE, LABEL:2, VALUE:2}, {...SELECTCHECKS_RESPONSE, LABEL: 3, VALUE:3}, {...SELECTCHECKS_RESPONSE, LABEL: 4, VALUE:4}, {...SELECTCHECKS_RESPONSE, LABEL: 5, VALUE:5}, {...SELECTCHECKS_RESPONSE, LABEL: 6, VALUE:6}], ...SAS_RESPONSE }),
    createMapEntry(SAS_SERVICE.UPLOAD.NAME, SAS_TYPE.UPLOAD_OVERRIDE, { data:[{...UPLOAD_RESPONSE}], preview_data:[{}],...SAS_RESPONSE }),
    createMapEntry(SAS_SERVICE.LOAD.NAME, SAS_TYPE.LOAD_OVERRIDE, { data:[{...LOAD_RESPONSE}], ...SAS_RESPONSE }),
    createMapEntry(SAS_SERVICE.CHECK_DATA.NAME, SAS_TYPE.CHECK_OVERRIDE, { data:[{...CHECK_RESPONSE}], ...SAS_RESPONSE }),
])