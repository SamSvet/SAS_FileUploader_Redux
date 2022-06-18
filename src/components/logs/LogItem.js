import React, {useEffect, useRef, useState} from "react";
import {CardContainer} from "../containers/CardContainer";
import {CardHeaderContainer} from "../containers/CardHeaderContainer";
import {CardBodyContainer} from "../containers/CardBodyContainer";
import {Chevron} from "../Chevron/Chevron";
import {Export} from "../Export/Export";

export const LogItem = ({title, content, logContent, logName}) => {
    const contentRef = useRef(null)
    const hRef = useRef(null)
    const [active, setActive] = useState(false)
    const [exported, setExported] = useState(false)

    useEffect(() => {
        hRef.current.setAttribute("href", '')
    }, [exported])

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px`: '0px'
    }, [active] )

    const exportLog = () => {
        const logItem = "data:text/csv;charset=utf-8," + encodeURIComponent(logContent)
        hRef.current.setAttribute("href", logItem)
        hRef.current.click()
        setExported(true)
    }

    return (
        <CardContainer isDragZone={false} >
            <CardHeaderContainer style={{overflow: 'visible'}} >
                <div className={'row'}>
                    <div className={'col-10'}>
                        {typeof title === 'function' ? title() : title}
                    </div>
                    <div className={'col-1'}>
                        <button className={'btn btn-sm btn-link no-outline '} onClick={exportLog}>
                            <Export height={20} fill={"#343a30"} className={'export-icon'}/>
                            <a ref={hRef} download={`${logName}.log`} />
                        </button>
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
            <CardBodyContainer ref={contentRef} >
                <div className={'d-flex justify-content-between container'} style={{fontSize: "12px"}}>
                    {typeof content === 'function' ? content() : content}
                </div>
            </CardBodyContainer>
        </CardContainer>
    )
}