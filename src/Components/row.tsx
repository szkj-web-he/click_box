/**
 * @file
 * @date 2022-08-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useRowEl } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Row = forwardRef<HTMLDivElement, RowProps>(({ children, index, ...props }, ref) => {
    Row.displayName = "Row";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const setRowEl = useRowEl();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            ref={(el) => {
                setRowEl(index, el);
                if (typeof ref === "function") {
                    ref(el);
                } else if (ref !== null) {
                    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                }
            }}
            {...props}
        >
            {children}
        </div>
    );
});
Row.displayName = "Row";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
