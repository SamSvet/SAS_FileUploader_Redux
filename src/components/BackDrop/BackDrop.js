import React from "react";
import "./backdrop.css"
import {useSelector} from "react-redux";
import {getAppLoading} from "../../selectors/appSelectors/app-selectors";

export const BackDrop = () => {
    const loading = useSelector(getAppLoading)
    return (
        <div className={`backdrop ${loading ? 'backdrop-active' : ''} `}>
            <div className={"spinner-border"} role={"status"}>
                <span className={"visually-hidden"}>Loading...</span>
            </div>
        </div>
    )
}

// export default BackDrop

// const mapStateToProps = state => ({
//     loading: state.app.loading
// })
// export default connect(mapStateToProps)(BackDrop)