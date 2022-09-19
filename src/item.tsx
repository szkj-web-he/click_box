/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { isMobile } from "./isMobile";
import { OptionProps } from "./unit";
import leftBg from "./Image/btn_left.png";
import rightBg from "./Image/btn_right.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    data: OptionProps;

    active?: boolean;

    onClick: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ data, active, onClick }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const touchStart = useRef(false);

    const touchMove = useRef(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = () => {
        const mobileStatus = isMobile();
        if (mobileStatus) {
            return;
        }
        onClick();
    };

    const handleTouchStart = () => {
        const mobileStatus = isMobile();
        if (!mobileStatus) {
            return;
        }
        touchStart.current = true;
        touchMove.current = false;
    };

    const handleTouchMove = () => {
        const mobileStatus = isMobile();
        if (!mobileStatus) {
            return;
        }
        touchMove.current = true;
    };

    const handleTouchEnd = () => {
        if (touchMove.current) {
            return;
        }

        if (!touchStart.current) {
            return;
        }
        onClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={`item${active ? " active" : ""}`}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="item_bg">
                <img src={leftBg} alt="" className="item_leftBg" />
                <div className="item_contentBg" />
                <img src={rightBg} alt="" className="item_rightBg" />
            </div>

            <span
                className="itemContent"
                dangerouslySetInnerHTML={{
                    __html: data.content,
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
