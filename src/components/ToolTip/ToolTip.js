import "./toolTip.css";

export const ToolTip = ({children, text, extrastyle={}, color="info", placement="right",}) => {
    return (
        <span className={'span-tooltip'} style={extrastyle} data-color={color} data-placement={placement} data-tooltip={text}>
            {children}
        </span>
    )
}