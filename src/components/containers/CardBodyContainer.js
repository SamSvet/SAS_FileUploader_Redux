import React from 'react'

export const CardBodyContainer = React.forwardRef((props, ref) => (
    <div ref={ref}
         className={` card-body pb-0 chevron__content ${props.extraclassname} `}
         style={props.style}
         {...props}
    >
        {props.children}
    </div>
))