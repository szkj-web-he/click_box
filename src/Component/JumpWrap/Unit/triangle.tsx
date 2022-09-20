/**
 * @file 三角形
 * @date 2022-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import icon from "../../../Image/icon_triangle.png";
import iconActive from "../../../Image/icon_triangleActive.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface TempProps {
    active?: boolean;

    placement: "top" | "bottom";
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ active, placement }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`jumpBtn_${placement}${active ? " active" : ""}`}>
            <div className="jumpBtn_bg">
                <div className="jumpBtn_border">
                    <div className="jumpBtn_innerBorder">
                        <div className="jumpBtn_innerContent" />
                    </div>
                </div>
            </div>
            <img src={icon} alt="" className="jumpBtn_icon" />
            <img src={iconActive} alt="" className="jumpBtn_iconActive" />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
