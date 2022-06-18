import React from 'react';
import {DefaultChecks} from "./DefaultChecks";

export const DefaultParams = ({bodyRef, bodyActive, initialHeight=200}) => {
    return (
        <div className={'d-flex justify-content-between container'} style={{minHeight: `${initialHeight}px`}} >
            <DefaultChecks bodyRef={bodyRef} bodyActive={bodyActive}/>
        </div>
    )
}