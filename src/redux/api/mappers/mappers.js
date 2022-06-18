export const selectChecksToViewModel = (selectChecks, processCD) => {
    if (processCD === 'SberCRM'){
        return [
            {LABEL:'MAIN_LIST', options:selectChecks.filter(el => el.SHEET === 'MAIN_LIST')},
            {LABEL:'DYN_LIST', options:selectChecks.filter(el => el.SHEET === 'DYN_LIST')}
        ]
    }
    return [{LABEL:'BASE', options:[...selectChecks]}]
}

const defaultHeaderRenderer = (errors, sheetData) => {
    return (props) => {
        const innerStyle = (errors.fileInput && errors.fileInput.errData && sheetData.index===0 && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
        return(
            <div style={innerStyle}>{props.column.name}</div>
        )
    }
}

const sberCRMHeaderRenderer = (errors, sheetData) => {
    return (props) => {
        const innerStyle = (errors.fileInput && errors.fileInput.errData && errors.fileInput.sheetName===sheetData.meta.sheetName && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
        return(
            <div style={innerStyle}>{props.column.name}</div>
        )
    }
}

const renderers = {
    SberCRM: sberCRMHeaderRenderer,
    DEFAULT: defaultHeaderRenderer
}

export const headerRenderer = (process, errors, sheetData) => {
    const renderer = renderers[process] || renderers.DEFAULT
    return renderer(errors, sheetData)
}