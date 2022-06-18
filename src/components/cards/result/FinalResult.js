import React from 'react'
import {SASLogo} from "../../SASLogo/SASLogo";
import {Ripple} from "../../Ripple/Ripple";
import {LoadButton} from "../../LoadButton/LoadButton";
import {ToolTip} from "../../ToolTip/ToolTip";

export const FinalResult = ({loadData, clickCallBack, extraclassname=''}) => {
    if (!(loadData && loadData.length )) return null
    return(
        <div className={extraclassname}>
            <table className={"table table-sm caption-top"}>
                <caption>
                    <ToolTip text={"Upload data into SAS"} placement={"left"} color={"primary"} extrastyle={{color:"#212529"}}>
                        <LoadButton
                            //disabled={!processCD}
                            onClickHandler={clickCallBack}
                            extraclassname={"border-0"} >
                            <SASLogo />
                            ЗАГРУЗИТЬ
                            <Ripple duration={2000} backgroundColor={"#fff"} />
                        </LoadButton>
                    </ToolTip>
                </caption>
                <thead>
                <tr>
                    <th scope={"col"}/>
                    <th scope={"col"}/>
                </tr>
                </thead>
                <tbody>
                {loadData.map((sasrow, idx) =>
                    <tr key={idx}>
                        <td>{sasrow.KEY}</td>
                        <td>{sasrow.VALUE}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}