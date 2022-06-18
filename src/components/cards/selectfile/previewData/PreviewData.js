import React, {useEffect, useState} from "react";
import {ResizableColumnTable} from "../resizableColumnTable/ResizableColumnTable";

export const PreviewData = ({previewData}) => {
    const [headings, setHeadings] = useState([{}])

    useEffect(() => {
        setHeadings(Object.keys(previewData[0]).map(col => ({text: col, initialWidth: "minmax(100px, 1fr)"})))
    }, [previewData])

    // const headings = [
    //     { text: "column1", initialWidth: "1fr" },
    //     { text: "column2", initialWidth: "1fr" },
    //     { text: "column3", initialWidth: "1fr" },
    // ];

    if (headings.length === 0) return <h5>No data to preview yet...</h5>
    return (
        <>
        <small>First 10 rows:</small>
        <ResizableColumnTable
            headings={headings}
            minCellWidth={100}
        >
            <tbody>
            {previewData.map((row, rownum) =>
                <tr key={rownum}>
                    {Object.keys(row).map((item, itemnum) =>
                    <td key={itemnum}>{row[item]}</td>
                    )}
                </tr>
            )}
                {/*<tr>*/}
                {/*    <td>value11</td>*/}
                {/*    <td>value12</td>*/}
               {/*    <td>value13</td>*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*    <td>value21</td>*/}
                {/*    <td>value22</td>*/}
                {/*    <td>value23</td>*/}
                {/*</tr>*/}
            </tbody>
        </ResizableColumnTable>
        </>
    );
};