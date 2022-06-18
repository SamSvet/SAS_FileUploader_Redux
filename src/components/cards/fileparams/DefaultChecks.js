import React, {useEffect} from 'react';
import {useForm} from "../../../hooks/useForm";
import Select from "react-select";
import {customStyles, groupStyles, groupBadgeStyles} from "../../SelectStyle/SelectStyle";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./checkList.css";
import "./defaultChecks.css";
import {useUploaderContext} from "../../../providers/UploaderContextProvider";

export const DefaultChecks = ({bodyRef, bodyActive}) => {
    const {checksOptions, dispatchSelectChecks} = useUploaderContext()
    const {localData, handleChangeSelect} = useForm()

    useEffect(() => {
        const checksList = checksOptions.flatMap(el => el.options).filter(el => el.ISFIXED)
        handleChangeSelect(checksList, "selectChecks")
        dispatchSelectChecks(checksList)
   }, [checksOptions, dispatchSelectChecks, handleChangeSelect])

    const onChange = (checksList, option) => {
        if (option.removedValue && option.removedValue.ISFIXED) return;
        handleChangeSelect(checksList, "selectChecks")
        dispatchSelectChecks(checksList)
    }

    useEffect(()=>{
        if (!bodyActive) return
        bodyRef.current.style.maxHeight = `${bodyRef.current.scrollHeight}px`
    },[localData])

    const formatGroupLabel = data => (
        <div style={groupStyles}>
            <span>{data.LABEL}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    )

    return (
        <div className="row w-100" >
            <div className="col-4">
                <Select
                    defaultValue={localData.selectChecks}
                    value={localData.selectChecks }
                    onChange={onChange}
                    menuPortalTarget={document.querySelector("body")}
                    isMulti
                    options={checksOptions}
                    formatGroupLabel={formatGroupLabel}
                    getOptionLabel = {(option) => option.LABEL}
                    getOptionValue = {(option) => option.VALUE}
                    styles={customStyles}
                   isClearable={false}
                    isSearchable={false}
                    components={{DropdownIndicator:() => null, IndicatorSeparator:() => null, CrossIcon:() => null, Placeholder:() => 'Варианты проверок'}}
                />
           </div>
            <div className="col-8">
                {Object.keys(localData).length>0 &&
                    <TransitionGroup component="ul" className="list-group">
                        {localData.selectChecks.map((check, idx) =>
                            <CSSTransition timeout={{enter:700, exit: 700}} key={idx} classNames={"check"}>
                                <div >
                                    <li className="list-group-item-borderless d-flex justify-content-between align-items-center" >
                                        {check.VALUE}
                                    </li>
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                }
            </div>
        </div>
    )
}