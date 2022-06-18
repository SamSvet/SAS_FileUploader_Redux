import React, {useCallback, useEffect, useRef, useState ,createRef} from "react";
import "./resizableColumnTable.css";

// const createHeaders = (headers) => {
//     return headers.map((item) => ({
//         text: item.text,
//         initialWidth: item.initialWidth,
//         // ref: useRef(null),
//         ref: createRef(),
//     }));
// };

export const ResizableColumnTable = ({children, headings=[], minCellWidth=100}) => {
    const columns = useRef([])
    // const columns2 = createHeaders(headings);
    const [activeIndex, setActiveIndex] = useState(-1);
    const tableElement = useRef(null);
    const clientWidth = useRef(0);

    useEffect(() => {
        columns.current = headings.map(item => ({
            text:item.text, initialWidth: item.initialWidth, ref: createRef()
        }))
    }, [headings])

    const mouseMove = useCallback(
        (event) => {
            const gridColumns = columns.current.map((col, i) => {
                if (i === activeIndex) {
                    const boundsLeft = col.ref.current.getBoundingClientRect().left;
                    const width = event.clientX - boundsLeft;
                    // const width = event.clientX - col.ref.current.offsetLeft;
                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
        },
        [activeIndex, columns, minCellWidth]
    );

    // const removeListeners = useCallback(() => {
    //     document.removeEventListener("mousemove", mouseMove);
    //     document.removeEventListener("mouseup", removeListeners);
    // }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(-1);
        tableElement.current.style.overflow="auto"
        // removeListeners();
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }, [mouseMove]);

    useEffect(() => {
        if (activeIndex !== -1) {
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        };
    }, [activeIndex, mouseMove, mouseUp]);

    useEffect(() => {
        tableElement.current.style.gridTemplateColumns = `${headings
            .map((header) => header.initialWidth)
            .join(" ")}`;
        clientWidth.current = tableElement.current.clientWidth;
        //tableElement.current.style.maxWidth = clientWidth.current + "px";
    }, [headings]);

    return (
        <table
            className={"resizable-table table table-hover table-sm "}
            ref={tableElement}
        >
            <thead className={"table-light"}>
                <tr>
                    {columns.current.map(({ ref, text }, index) => (
                        <th ref={ref} key={index}>
                            {text}
                            <span
                                onMouseDown={() => {setActiveIndex(index); tableElement.current.style.overflow="hidden"}}
                                className={`resize-handle ${
                                    activeIndex === index ? "header--being-resized" : ""
                                }`}
                            />
                        </th>
                    ))}
                </tr>
            </thead>
            {children}
        </table>
    );
}