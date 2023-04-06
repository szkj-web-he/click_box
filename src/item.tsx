/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { useImageContext } from "./context";
import { sum } from "./math";
import { drawMedicineCabinet } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;

    onClick: () => void;

    children?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    active,
    onClick,
    children,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);
    const bgRef = useRef<HTMLCanvasElement | null>(null);

    const { activeLoading, grayLoading, activeEl, grayEl } = useImageContext();

    const timer = useRef<number>();

    const opacity = useRef(0);

    const shadowBlur = useRef(4);

    const activeLoadingRef = useRef(activeLoading);

    const grayLoadingRef = useRef(grayLoading);
    activeLoadingRef.current = activeLoading;
    grayLoadingRef.current = grayLoading;
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        /**
         * 给canvas宽高
         */
        const getSize = () => {
            const c = ref.current;

            const ctx = c?.getContext("2d");
            if (!ctx) {
                return;
            }
            const parent = c?.parentElement;

            if (!parent) {
                return;
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const width = parent.offsetWidth;
            const height = parent.offsetHeight;
            c.width = width;
            c.height = height;

            drawMedicineCabinet(
                ctx,
                active ?? false,
                activeEl.current,
                activeLoading,
                grayEl.current,
                grayLoading,
            );
        };
        getSize();
        document.fonts.addEventListener("loading", getSize);
        return () => {
            document.fonts.removeEventListener("loading", getSize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, activeLoading, grayLoading]);

    useEffect(() => {
        return () => {
            timer.current && window.cancelAnimationFrame(timer.current);
        };
    }, [active]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const blurAnimate = (speed: number) => {
        timer.current && window.cancelAnimationFrame(timer.current);

        if (speed > 0 && active) {
            return;
        }
        const bgEl = bgRef.current;
        if (!bgEl) {
            return;
        }
        const el = ref.current;
        if (!el) {
            return;
        }

        bgEl.width = el.width + (shadowBlur.current + 1) * 2;
        bgEl.height = el.height + (shadowBlur.current + 1) * 2;

        const ctx = bgEl.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.translate(shadowBlur.current + 1, shadowBlur.current + 1);

        const startRun = () => {
            opacity.current = sum(speed, opacity.current);
            ctx.clearRect(
                -(shadowBlur.current + 1),
                -(shadowBlur.current + 1),
                bgEl.width,
                bgEl.height,
            );
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = shadowBlur.current;
            ctx.shadowColor = `rgba(0, 117, 158,${opacity.current})`;
            drawMedicineCabinet(
                ctx,
                false,
                activeEl.current,
                activeLoading,
                grayEl.current,
                grayLoading,
                shadowBlur.current + 1,
            );

            if (speed > 0) {
                if (opacity.current < 1) {
                    timer.current = window.requestAnimationFrame(startRun);
                } else {
                    timer.current = undefined;
                }
            } else if (speed < 0) {
                if (opacity.current > 0) {
                    timer.current = window.requestAnimationFrame(startRun);
                } else {
                    timer.current = undefined;
                    ctx.clearRect(
                        -(shadowBlur.current + 1),
                        -(shadowBlur.current + 1),
                        bgEl.width,
                        bgEl.height,
                    );
                }
            }
        };
        timer.current = window.requestAnimationFrame(startRun);
    };

    const handleMouseEnter = () => {
        blurAnimate(0.1);
    };

    const handleMouseLeave = () => {
        blurAnimate(-0.1);
    };

    const handleClick = () => {
        const bgEl = bgRef.current;
        if (!bgEl) {
            return;
        }
        const el = ref.current;
        if (!el) {
            return;
        }

        bgEl.width = el.width + (shadowBlur.current + 1) * 2;
        bgEl.height = el.height + (shadowBlur.current + 1) * 2;
        const ctx = bgEl.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.translate(shadowBlur.current + 1, shadowBlur.current + 1);
        ctx.clearRect(
            -(shadowBlur.current + 1),
            -(shadowBlur.current + 1),
            bgEl.width,
            bgEl.height,
        );
        if (active) {
            opacity.current = 1;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = shadowBlur.current;
            ctx.shadowColor = `rgba(0, 117, 158,${opacity.current})`;
            drawMedicineCabinet(
                ctx,
                false,
                activeEl.current,
                activeLoadingRef.current,
                grayEl.current,
                grayLoadingRef.current,
                shadowBlur.current + 1,
            );
        } else {
            opacity.current = 0;
        }

        onClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={`item${active ? " active" : ""}`}
            onMouseEnter={(e) => {
                onMouseEnter?.(e);
                handleMouseEnter();
            }}
            onMouseLeave={(e) => {
                onMouseLeave?.(e);
                handleMouseLeave();
            }}
            onClick={handleClick}
            {...props}
        >
            <canvas ref={ref} className="item_icon" />
            <canvas ref={bgRef} className="item_bgIcon" />
            {children}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
