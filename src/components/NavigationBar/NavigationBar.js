import React, {useState, useCallback} from "react";
import Navbar from 'react-bootstrap/Navbar';
import {ButtonGroup, Button} from "react-bootstrap";
import { useTranslation} from "react-i18next";
import logo from "../../logo/SAS64.svg.png";
import {ToggleCheck} from "../ToggleCheck/ToggleCheck";
import {useUploaderContext} from "../../providers/UploaderContextProvider";
import {LogsModal} from "../logs/LogsModal";


export const NavigationBar = () => {
    const { t } = useTranslation();
    const {debugMode, handleDebugMode} = useUploaderContext()
    const [showLogs, setShowLogs] = useState(false)

    const handleClose = useCallback(() => {
        setShowLogs(false)
    }, [setShowLogs])

    return (
        <>
            <Navbar bg="light" sticky="top" variant="light" expand={"lg"} className={"ps-1 border"}>
                <Navbar.Brand href="#home" >
                    <img
                        alt=""
                        src={logo}
                        width="64"
                        height="26"
                        className="d-inline-block align-top"
                    />
                    {t("navbar.logo")}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end"  id="basic-navbar-nav">
                    <ButtonGroup className={"pe-1"}>
                        <div className={"switch_input-group-text"}>
                            <span>
                                {t("navbar.debug")}
                                <ToggleCheck
                                    checked={debugMode}
                                    onChange={() => handleDebugMode(!debugMode)}
                                    id="switchDebug"
                                    style={{display: 'inline-table'}}
                                />
                            </span>
                        </div>
                        <Button variant="outline-dark" className={"border-end-0 border-top-0 border-bottom-0"}
                                onClick={() => setShowLogs(true)}
                        >
                            {t("navbar.logs.openBtn")}
                        </Button>
                    </ButtonGroup>
                </Navbar.Collapse>
            </Navbar>
            <LogsModal showLogs={showLogs} handleClose={handleClose}/>
        </>
    )
}