import { createSelector } from "reselect";

const getAppState = (store) => store.app;
export const getAppLoading = createSelector(getAppState, (state) => state.loading);
export const getAppDebug = createSelector(getAppState, (state) => state.debug);
export const getAppProcessCD = createSelector(getAppState, (state) => state.processCD);
export const getFileName = createSelector(getAppState, (state) => state.fileName);
export const getSelectedChecks = createSelector(getAppState, (state) => state.selectChecks);