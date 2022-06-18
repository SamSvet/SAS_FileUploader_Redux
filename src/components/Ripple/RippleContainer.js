import React from "react";
import "./ripple.css";

export const RippleContainer = ({onMouseDown, children,}) => {
    return (
        <div className={"ripple-container"} onMouseDown={onMouseDown}>
            {children}
        </div>
    );
};