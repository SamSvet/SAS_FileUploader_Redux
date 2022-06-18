import {CSSTransition, TransitionGroup} from "react-transition-group";
import React from "react";
import {SAS_SERVICE} from "../../../redux/types";
import "../../cards/fileparams/checkList.css";
import {ToolTip} from "../../ToolTip/ToolTip";

const DownloadLink = ({sasrow}) => {
    const colorsDict = {
        0: {link:"link-success", tooltip:"success"},
        1: {link:"link-danger", tooltip:"error"},
        [-1]: {link:"link-warning", tooltip:"warning"},
        DEFAULT: {link:"link-secondary", tooltip:"secondary"},
    }
    const renderLink = (errorCode) => {
        return colorsDict[errorCode] || colorsDict.DEFAULT
    }
    return (
        <div className={"w-50"}>
            {/*<label>*/}
            {/*    {sasrow.RC === 0 && <input type="checkbox" id="interCheckboxSuc" name={"interCheckboxSuc"} disabled checked/>}*/}
            {/*    {sasrow.RC === 1 && <input type="checkbox" id="interCheckboxErr" name={"interCheckboxErr"} disabled />}*/}
            {/*    {sasrow.RC === -1 && <input type="checkbox" id="interCheckboxWrn" name={"interCheckboxWrn"} disabled checked/>}*/}
            {/*</label>*/}
            <ToolTip text={"Download data"} placement={"right"} color={`${renderLink(sasrow.RC).tooltip}`} >
                <a
                    className={`${renderLink(sasrow.RC).link} position-relative`}
                    href={`/SASStoredProcess/do?_program=${SAS_SERVICE.DOWNLOAD.DEFAULT_PATH}&TABLE=${sasrow.TABLENAME}&TYPE=${sasrow.RC}`}
                >
                    {sasrow.DESC}
                </a>
                <small style={{fontSize:"0.6rem"}} className={" position-absolute top-0 start-100 translate-middle-y badge rounded-pill bg-secondary "}>{sasrow.CNT}</small>
            </ToolTip>

        </div>
    )
}

export const CheckResult = ({checkData}) => {
    return (
        <TransitionGroup component="ul" className="list-group" >
            {checkData.map((sasrow) =>
                <CSSTransition classNames={"check"} timeout={{enter:700, exit:700}} key={`${sasrow.RC}`}>
                    <li className="list-group-item-borderless d-flex justify-content-between align-items-center">
                        <DownloadLink sasrow={sasrow}/>
                    </li>
                </CSSTransition>
            )}
        </TransitionGroup>
    )
}