import React, {createContext, useCallback, useContext, useState} from 'react';
import H54s from "h54s";
import {useDispatch, useSelector} from "react-redux";
import {setServiceDebug, getServiceDebug, serviceClearAllLogs} from "../redux/api/sasApi";
import {APP_TYPE, SAS_SERVICE, SAS_TYPE} from "../redux/types";
import {
    getCheckData, getLoadData,
    getLogs,
    getPreviewData,
    getSelectChecksView,
    getStartup,
    getUploadService
} from "../selectors/sasSelectors/sas-selectors";
import {sasDispatcher} from "../redux/thunks/sasDispatcher";
import {getAppProcessCD, getFileName, getSelectedChecks} from "../selectors/appSelectors/app-selectors";


const UploaderContext = createContext(null)

export const UploaderContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const [debugMode, setDebugMode] = useState(getServiceDebug())
    const startup = useSelector(getStartup)
    const logs = useSelector(getLogs)
    const checksOptions = useSelector(getSelectChecksView)
    const processCD = useSelector(getAppProcessCD)
    const previewData = useSelector(getPreviewData)
    const uploadData = useSelector(getUploadService)
    const selectChecks = useSelector(getSelectedChecks)
    const checkData = useSelector(getCheckData)
    const loadData = useSelector(getLoadData)
    const fileName = useSelector(getFileName)

    const handleDebugMode = useCallback( (debugValue) => {
        setServiceDebug(debugValue);
        setDebugMode(debugValue);
        dispatch({type:APP_TYPE.SET_DEBUG, payload: debugValue})
    }, [dispatch])
   
    const clearLogs = () => {
        serviceClearAllLogs()
        dispatch({type:SAS_TYPE.CLEAR_LOGS})
    }

    const handleProcessCD = useCallback((processValue) => {
        dispatch({type:APP_TYPE.SET_PROCESS, payload: processValue})
    }, [dispatch])

    const callStartupService = useCallback(() => {
        dispatch(sasDispatcher(SAS_SERVICE.STARTUP.DEFAULT_PATH, SAS_SERVICE.STARTUP.NAME))
    }, [dispatch])

    const callSelectChecks = useCallback( async (processCD) => {
        const sasTable = new H54s.SasData([{PROCESS_CD: processCD}], "app_data")
        return dispatch(sasDispatcher(SAS_SERVICE.SELECT_CHECKS.DEFAULT_PATH, SAS_SERVICE.SELECT_CHECKS.NAME, sasTable))
    }, [dispatch])
   
    const dispatchSelectChecks = useCallback((selectChecks) => {
        dispatch({type:APP_TYPE.SET_CHECKS, payload: selectChecks})
    }, [dispatch])

    const dispatchSetFileName = useCallback((fileName) => {
        dispatch({type:APP_TYPE.SET_FILENAME, payload: fileName})
    }, [dispatch])

    const callUploadService = useCallback(async (fileData, processCD) => {
        const sasTable = new H54s.SasData([{PROCESS_CD: processCD}], "app_data")
        sasTable.addFile(fileData, 'myFile')
        return dispatch(sasDispatcher(SAS_SERVICE.UPLOAD.DEFAULT_PATH, SAS_SERVICE.UPLOAD.NAME, sasTable))
    }, [dispatch])

    const callCheckService = useCallback(async (processCD, uploadData, selectChecks) => {
        const sasTable = new H54s.SasData([{PROCESS_CD: processCD, ...uploadData[0]}], "app_data")
        sasTable.addTable(selectChecks, 'checkOptions')
        return dispatch(sasDispatcher(SAS_SERVICE.CHECK_DATA.DEFAULT_PATH, SAS_SERVICE.CHECK_DATA.NAME, sasTable))
    }, [dispatch])

    const callLoadService = useCallback(async (processCD, fileName, checkData) => {
        const sasTable = new H54s.SasData(checkData.map(item => ({PROCESS_CD: processCD, USERFILENAME: fileName, ...item})), "app_data")
        return dispatch(sasDispatcher(SAS_SERVICE.LOAD.DEFAULT_PATH, SAS_SERVICE.LOAD.NAME, sasTable))
    }, [dispatch])

    const value = {
        startup,
        checksOptions,
        debugMode,
        logs,
        clearLogs,
        handleDebugMode,
        handleProcessCD,
        callStartupService,
        dispatchSelectChecks,
        callSelectChecks,
        callUploadService,
        processCD,
        previewData,
        callCheckService,
        uploadData,
        selectChecks,
        checkData,
        loadData,
        callLoadService,
        dispatchSetFileName,
        fileName
    }

    return (
        <UploaderContext.Provider value={value}>
            {children}
        </UploaderContext.Provider>
    )
}

export const useUploaderContext = () => useContext(UploaderContext)