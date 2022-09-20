/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import star from "./Image/item_top.png";
import topIcon1 from "./Image/item_top1.png";
import topIcon2 from "./Image/item_top2.png";
import topIcon3 from "./Image/item_top3.png";
import { isMobile } from "./isMobile";
import { OptionProps } from "./unit";
/* 
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
            const rect = parent.getBoundingClientRect();

            el.width = rect.width;
            el.height = rect.height;
            const ctx = el.getContext("2d");
            if (!ctx) {
                return;
            }
            const margin = 1.5;
            const startX = margin;
            const startY = margin;
            const endX = rect.width - margin;
            const endY = rect.height - margin;
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
            <img src={star} alt="" className="item_starIcon" />
            <div className="item_bg">
                <img src={topIcon2} alt="" className="item_line1" />
                <img src={topIcon1} alt="" className="item_line2" />
                <img src={topIcon3} alt="" className="item_line3" />
            </div>
            <div className="item_innerBg" />
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
