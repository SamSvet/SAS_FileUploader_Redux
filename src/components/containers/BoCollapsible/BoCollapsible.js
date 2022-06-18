import React, {useState, useRef, useEffect} from "react";
import "./bocollapsible.css";
import {Export} from "../../Export/Export";
import {Chevron} from "../../Chevron/Chevron";

export const BoCollapsible = ({children, ...props}) => {
    const [exported, setExported] = useState(false)
    const hRef = useRef(null)
    const [active, setActive] = useState(false)

    useEffect(() => {
        hRef.current.setAttribute("href", '')
    }, [exported])

    const exportLog = () => {
        const logContent = "data:text/csv;charset=utf-8," + encodeURIComponent(props.logContent)
        hRef.current.setAttribute("href", logContent)
        hRef.current.click()
        setExported(true)
    }

    return (
        <div className={'boCollapsible'}>
            <button className={'float-start btn btn-sm btn-link no-outline export-btn'} onClick={exportLog}>
                <Export height={20} fill={"#343a30"} className={'export-icon'}/>
                <a ref={hRef} download={`${props.logName}.log`} />
            </button>
            <div className={'title'} >
                {typeof props.title === 'function' ? props.title() : props.title}
            </div>
            <div className={`content ${active ? 'open' : ''}`}>
                {typeof props.content === 'function' ? props.content() : props.content}
            </div>
            <button
                className="float-end btn btn-sm btn-outline-light"
                onClick={() => {setActive((prev) => !prev)}}
            >
                <Chevron active={active} width={10} fill={"#343a30"}/>
            </button>
        </div>
    )
}