/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { isMobile } from "./isMobile";
import { OptionProps } from "./unit";
import item from "./Image/item.png";
// import leftBg from "./Image/btn_left.png";
// import rightBg from "./Image/btn_right.png";
/* import { useEffect } from 'react';
<------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
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

    const ref = useRef<HTMLCanvasElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            const el = ref.current;
            if (!el) {
                return;
            }
            const parent = el.parentElement;
            if (!parent) {
                return;
            }
            const width = parent.offsetWidth;
            const height = parent.offsetHeight;

            el.width = width;
            el.height = height;
            const ctx = el.getContext("2d");
            if (!ctx) {
                return;
            }
            const margin = 1.5;
            const startX = margin;
            const startY = margin;
            const endX = width - margin;
            const endY = height - margin;
            const padding = 8;

            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;

            ctx.moveTo(startX, startY);
            ctx.lineTo(endX - padding, startY);
            ctx.lineTo(endX, startY + padding);
            ctx.lineTo(endX, endY);
            ctx.lineTo(startX + padding, endY);
            ctx.lineTo(startX, endY - padding);
            ctx.lineTo(startX, startY);
            ctx.closePath();
            ctx.stroke();
        };
        fn();
        void document.fonts.ready.then(fn);
    }, []);

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
                <div className="item_circle1" />
                <div className="item_circle2" />
            </div>
            <img src={item} alt="" className="item_icon" />

            <canvas ref={ref} className="item_border" />
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
