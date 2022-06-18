import {useCallback, useState} from 'react'
import moment from 'moment'

export const useForm = () => {
    const [localData, setLocalData] = useState({})

    const handleChange = (e) => {
        e.persist()
        setLocalData(prevLocalData => ({...prevLocalData, [e.target.name]: e.target.value}))
    }
    const handleChangeDttm = (dttm, dttmFormat, name) => {
        setLocalData(prevLocalData => ({...prevLocalData, [name]: moment(dttm).format(dttmFormat)}))
    }
    const handleChangeSelect = useCallback((e, name) => {
        setLocalData(prevLocalData => ({...prevLocalData, [name]: e}))
    }, [setLocalData])

    const handleChangeCheck = useCallback((e) => {
        setLocalData(prevLocalData => ({...prevLocalData, [e.target.name]: e.target.checked ? 1 : 0}))
    }, [setLocalData])

    return {localData, handleChange, handleChangeDttm, handleChangeSelect, handleChangeCheck}
}