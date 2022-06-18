import React, {useState, useEffect, useRef} from "react";
import Select from 'react-select';
import {CardContainer} from "../../containers/CardContainer";
import {CardHeaderContainer} from "../../containers/CardHeaderContainer";
import {CardBodyContainer} from "../../containers/CardBodyContainer";
import {customStyles} from "../../SelectStyle/SelectStyle";
import {useTranslation} from "react-i18next";
import {Chevron} from "../../Chevron/Chevron";
import {useUploaderContext} from "../../../providers/UploaderContextProvider";
import {DefaultParams} from "./DefaultParams";

export const FileParamsCard = () => {
    const {t} = useTranslation()
    const contentRef = useRef(null)
    const [channel, setChannel] = useState({VALUE:null, LABEL: ''})
    const [active, setActive] = useState(false)
    const {startup, handleProcessCD, callStartupService, callSelectChecks} = useUploaderContext()

    useEffect(() => {
        callStartupService()
    }, [])

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px`: '0px'
    }, [active] )

    const selectChange = (startupObj) => {
        setActive(false)
        callSelectChecks(startupObj.LABEL).then( () => {setActive(true)})
        setChannel(startupObj)
        handleProcessCD(startupObj.LABEL)
    }

    return (
        <CardContainer isDragZone={false} className={"border-light"}>
            <CardHeaderContainer style={{overflow: 'visible'}} >
                <div className={'row'}>
                    <div className={'col-5'}>
                        <Select
                            menuPortalTarget={document.querySelector("body")}
                            isSearchable={false}
                            value={t("card.file.header")}
                            placeholder={t("card.file.header")}
                            onChange={selectChange}
                            className={'float-start'}
                            options={startup}
                            getOptionLabel = {(option) => option.LABEL}
                            getOptionValue = {(option) => option.VALUE}
                            // styles={{...customStyles, ...(errors.fileParamsType && errorStyles)}}
                            // isDisabled={loading}
                            styles={{...customStyles,}}
                            components={{
                                DropdownIndicator:() => null,
                                IndicatorSeparator:() => null,
                                //Placeholder:() => loading ? <>Процесс...<span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/></> : 'Процесс'
                            }}
                        />
                    </div>
                    <div className={'col-6 align-self-center'}><span>{channel.LABEL}</span></div>
                    <div className={'col-1'}>
                        <button
                            className="float-end btn btn-sm btn-outline-light"
                            onClick={() => {setActive((prev) => !prev)}}
                        >
                            <Chevron active={active} width={10} fill={"#343a30"}/>
                        </button>
                    </div>
                </div>
            </CardHeaderContainer>
            <CardBodyContainer ref={contentRef} >
                <DefaultParams initialHeight={200} bodyRef={contentRef} bodyActive={active}/>
            </CardBodyContainer>
        </CardContainer>
    )
}