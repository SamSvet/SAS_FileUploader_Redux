import React, {useCallback, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getShouldLogin} from "../../selectors/sasSelectors/sas-selectors";
import {getLoginUrl} from "../../redux/api/sasApi";

const LoginModal = ({shouldLogin}) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(shouldLogin)
    },[shouldLogin])

    const onHide = useCallback(() => {
        setShow(false)
        window.location.assign(getLoginUrl())
        // window.location.replace(getLoginUrl())
    },[])

    return (
        <Modal show={show} size={"sm"} onHide={onHide} animation={true} centered >
            <Modal.Header >
                You are not logged in!
            </Modal.Header>
            <Modal.Body>
                Try to refresh page
            </Modal.Body>
        </Modal>
    )
}

export const InfoModal = () => {
    const shouldLogin = useSelector(getShouldLogin)
    return <LoginModal shouldLogin={shouldLogin} />
}