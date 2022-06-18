import { createSelector } from "reselect";
import {SAS_SERVICE} from "../../redux/types";
import {getAppProcessCD} from "../appSelectors/app-selectors";
import {selectChecksToViewModel} from "../../redux/api/mappers/mappers";

const getSasState = (store) => store.sas;

export const getStartup = createSelector(getSasState, state => state[SAS_SERVICE.STARTUP.NAME].data);

export const getSelectChecks = createSelector(getSasState, state => state[SAS_SERVICE.SELECT_CHECKS.NAME].data);

export const getUploadService = createSelector(getSasState, state => state[SAS_SERVICE.UPLOAD.NAME].data);

export const getPreviewData = createSelector(getSasState, state => state[SAS_SERVICE.UPLOAD.NAME].preview_data);

export const getLogs = createSelector(getSasState, state => state.logs);

export const getSelectChecksView = createSelector(getSelectChecks, getAppProcessCD, selectChecksToViewModel);

export const getCheckData = createSelector(getSasState, state => state[SAS_SERVICE.CHECK_DATA.NAME].data);

export const getLoadData = createSelector(getSasState, state => state[SAS_SERVICE.LOAD.NAME].data);

export const getShouldLogin = createSelector(getSasState, (state) => state.shouldLogin);