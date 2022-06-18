import React from "react";
import {Button, Modal, Tab, Tabs} from "react-bootstrap";
import "./logsModal.css";
import {LogHeader} from "./LogHeader"
import moment from "moment";
import {useUploaderContext} from "../../providers/UploaderContextProvider";
import {useTranslation} from "react-i18next";
import {LogItem} from "./LogItem";

export const LogsModal = ({showLogs, handleClose}) => {
    const {logs, clearLogs} = useUploaderContext()
    const { t } = useTranslation();

    return (
        <Modal size={"xl"} show={showLogs} onHide={handleClose} animation={true}>
            <Modal.Body>
                <Tabs id="tab-logs">
                    <Tab tabClassName={"logsTabs"} eventKey="application" title={t("navbar.logs.applicationTab")}>
                        {logs.applicationLogs && logs.applicationLogs.length > 0
                            ? logs.applicationLogs.map((log,index) =>
                                <div key={index}>
                                    <LogHeader log={log}/>
                                    <pre>{log.message}</pre>
                                </div>)
                            : <h4>{t("navbar.logs.applicationEmpty")}</h4>
                        }
                    </Tab>
                    <Tab eventKey="debug" title={t("navbar.logs.debugTab")}>
                        {logs.debugData && logs.debugData.length > 0
                            ? logs.debugData.map((debugLog,index) =>
                                <LogItem
                                    key={index}
                                    logName={`${debugLog.sasProgram.substr(debugLog.sasProgram.lastIndexOf('/')+1)}_${moment(debugLog.time).format('YYYY.MM.DD_HH:mm:ss')}`}
                                    logContent={debugLog.debugText}
                                    title={<LogHeader log={debugLog}/>}
                                    content={() => <div dangerouslySetInnerHTML={{__html:debugLog.debugHtml}}/>}
                                />
                            )
                            : <h4>{t("navbar.logs.debugEmpty")}</h4>
                        }
                    </Tab>
                    <Tab eventKey="failed" title={t("navbar.logs.failedTab")}>
                        {logs.failedRequests && logs.failedRequests.length > 0
                            ? logs.failedRequests.map((failedLog,index) =>
                                <LogItem
                                    key={index}
                                    logName={`${failedLog.sasProgram.substr(failedLog.sasProgram.lastIndexOf('/')+1)}_${moment(failedLog.time).format('YYYY.MM.DD_HH:mm:ss')}`}
                                    logContent={failedLog.responseText}
                                    title={<LogHeader log={failedLog}/>}
                                    content={() => <div dangerouslySetInnerHTML={{__html:failedLog.responseHtml}}/>}
                                />
                            )
                            : <h4>{t("navbar.logs.failedEmpty")}</h4>
                        }
                    </Tab>
                    <Tab eventKey="errors" title={t("navbar.logs.errorTab")}>
                        {logs.sasErrors && logs.sasErrors.length > 0
                            ? logs.sasErrors.map((sasError,index) =>
                                <div key={index}>
                                    <LogHeader log={sasError}/>
                                    <pre>{sasError.message}</pre>
                                </div>)
                            : <h4>{t("navbar.logs.errorEmpty")}</h4>
                        }
                    </Tab>
                </Tabs>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark border-0" onClick={() => {clearLogs(); handleClose()}}>
                    {t("navbar.logs.clearBtn")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}