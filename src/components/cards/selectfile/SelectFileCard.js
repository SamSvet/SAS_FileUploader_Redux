import React, { useEffect, useRef, useState} from "react";
import {CardHeaderContainer} from "../../containers/CardHeaderContainer";
import {CardBodyContainer} from "../../containers/CardBodyContainer";
import {CardContainer} from "../../containers/CardContainer";
import {Chevron} from "../../Chevron/Chevron";
import "./selectFile.css";
import {useUploaderContext} from "../../../providers/UploaderContextProvider";
import {PreviewData} from "./previewData/PreviewData";

export const SelectFileCard = () => {
    const {callUploadService, processCD, previewData, dispatchSetFileName } = useUploaderContext()
    const [state, setState] = useState({active: false, highlighted: false, fileName: ''})
    const textInput = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        contentRef.current.style.maxHeight = state.active ? `${contentRef.current.scrollHeight}px`: '0px'
    }, [state.active] )

    const handleUploadService = (fileData, processCD) => {
        setState(prevState => ({...prevState, active: false, highlighted: false,  fileName: fileData.name}))
        callUploadService(fileData, processCD).then( () => {
            dispatchSetFileName(fileData.name)
            setState(prevState => ({...prevState, active: true, highlighted: false,  fileName: fileData.name}))
        })
    }

    // const dropFunction = (e) => {
    //     e.preventDefault()
    //     handleUploadService(e.dataTransfer.files[0], processCD)
    // }
    const inputHandler = (e) => {
        handleUploadService(e.target.files[0], processCD)
    }

    // const checkServiceCallBack = useCallback( () => {
    //     callCheckService(processCD, uploadData, selectChecks)
    //         .then( () => console.log("callCheckService finished"))
    // }, [callCheckService, processCD, selectChecks, uploadData])
   
    return (
        <CardContainer
            className={` ${state.highlighted ? 'border-dark' : 'border-light'}`}
            isDragZone={false}
            // dragOverCallBack={(event) => {event.stopPropagation(); event.preventDefault()}}
            // dropCallBack={(event) => dropFunction(event)}
            // dragEnterCallBack={() => setState(prevState => ({...prevState, highlighted:true}))}
            // dragLeaveCallBack={() => setState(prevState => ({...prevState, highlighted:false}))}
        >
            <CardHeaderContainer>
                <div className={'row'}>
                    <div className={'col-5'}>
                        <button
                            //disabled={!processCD}
                            type="button"
                            style={{width:"300px", height: '38px'}}
                            className={'btn btn-outline-dark text-start border-0'}
                            onClick={() => {textInput.current.click()}}
                        >Файл
                        </button>
                        <input name={"fileInput"} type="file" className="inputfile inputfile-5" ref={textInput}
                               accept=".csv, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                               onChange={inputHandler} onClick={e => e.target.value=""}
                        />
                    </div>
                    <div className={'col-6 overflow-visible d-inline-flex align-items-center '}>
                        <span>{state.fileName}</span>
                    </div>

                    <div className={'col-1'}>
                        <button
                            className="float-end btn btn-sm btn-outline-light"
                            onClick={() => setState(prevState => ({...prevState, active:!prevState.active}))}
                        >
                            <Chevron active={state.active} width={10} fill={"#343a30"}/>
                        </button>
                    </div>
                </div>
            </CardHeaderContainer>
            <CardBodyContainer ref={contentRef} extraclassname={'w-100 overflow-hidden'}>
                <PreviewData previewData={previewData}/>
            </CardBodyContainer>
        </CardContainer>
    )
}