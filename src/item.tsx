/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import item from "./Image/item.png";
import { draw, OptionProps } from "./unit";

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

    const ref = useRef<HTMLCanvasElement | null>(null);
    const hoverRef = useRef<HTMLCanvasElement | null>(null);

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

            draw(ctx);
        };

        const fn2 = () => {
            const bgEl = hoverRef.current;
            if (!bgEl) {
                return;
            }
            const parent = bgEl.parentElement;
            if (!parent) {
                return;
            }

            const rect = parent.getBoundingClientRect();

            bgEl.width = rect.width + 3 * 2;
            bgEl.height = rect.height + 3 * 2;
            const ctx = bgEl.getContext("2d");
            if (!ctx) {
                return;
            }

            draw(ctx, true);
        };

        const main = () => {
            fn();
            fn2();
        };
        main();
        void document.fonts.ready.then(main);
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = () => {
        onClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`item${active ? " active" : ""}`} onClick={handleClick}>
            <div className="item_bg">
                <div className="item_circle1" />
                <div className="item_circle2" />
            </div>
            <img src={item} alt="" className="item_icon" />

            <canvas ref={ref} className="item_border" />
            <canvas ref={hoverRef} className="item_bgHover" />
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
