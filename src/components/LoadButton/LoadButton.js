import React from "react";
import "./loadButton.css";

export const LoadButton = ({children, onClickHandler, loading=false, disabled=false, extraclassname=''}) => (
    <button type="button"
            disabled={loading || disabled}
            style={{position:"relative", overflow:"hidden"}}
            className={`btn btn-primary no-outline ${extraclassname}`}
            onClick={onClickHandler}
    >
        {children}
        {loading && <span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/>}
    </button>
)