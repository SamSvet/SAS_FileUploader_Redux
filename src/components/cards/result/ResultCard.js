import {CardHeaderContainer} from "../../containers/CardHeaderContainer";
import {CardContainer} from "../../containers/CardContainer";
import {Chevron} from "../../Chevron/Chevron";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {CardBodyContainer} from "../../containers/CardBodyContainer";
import {FinalResult} from "./FinalResult";
import {CheckResult} from "./CheckResult";
import {useUploaderContext} from "../../../providers/UploaderContextProvider";

export const ResultCard = () => {
    const {processCD, selectChecks, callCheckService, callLoadService, checkData, uploadData, loadData, fileName} = useUploaderContext()
    const [active, setActive] = useState(false)
    const contentRef = useRef(null)

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px`: '0px'
    }, [active] )

    const checkServiceCallBack = useCallback( () => {
        setActive(false)
        callCheckService(processCD, uploadData, selectChecks)
            .then( () => setActive(true))
    }, [callCheckService, processCD, selectChecks, uploadData])

    const loadServiceCallBack = useCallback( () => {
        setActive(false)
        callLoadService(processCD, fileName, checkData).then(() => setActive(true))
    }, [callLoadService, checkData, processCD])

    return (
        <CardContainer
            className={'border-light'}
            isDragZone={false}
        >
            <CardHeaderContainer>
                <div className={'row'}>
                    <div className={'col-5'}>
                        <button
                            disabled={!processCD}
                            type="button"
                            style={{width:"300px", height: '38px'}}
                            className={'btn btn-outline-dark text-start border-0'}
                            onClick={checkServiceCallBack}
                        >Проверка
                        </button>
                    </div>
                    <div className={'col-6 overflow-visible d-inline-flex align-items-center '}>
                        {/*<ToolTip text={"Проверить выбранный файл"} placement={"left"} style={{color: "orange"}}>*/}
                        {/*    <LoadButton*/}
                        {/*        disabled={!processCD}*/}
                        {/*        onClickHandler={checkServiceCallBack}*/}
                        {/*        extraclassname={"border-0 me-2"} >*/}
                        {/*        <SASLogo />*/}
                        {/*        ПРОВЕРИТЬ*/}
                       {/*        <Ripple duration={2000} backgroundColor={"#fff"} />*/}
                        {/*    </LoadButton>*/}
                        {/*</ToolTip>*/}
                    </div>
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
            <CardBodyContainer ref={contentRef} extraclassname={'w-100 overflow-hidden row'}>
                <div className={"col-6"}>
                    <CheckResult checkData={checkData}/>
                </div>
                <div className={"col-6"}>
                    <FinalResult loadData={loadData} clickCallBack={loadServiceCallBack} />
                </div>
            </CardBodyContainer>
        </CardContainer>
    )
}