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
const Temp: React.FC<TempProps> = ({ active, onClick, children, ...props }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);

    const { activeLoading, grayLoading, activeEl, grayEl } = useImageContext();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        // 画柄
        const drawDar = (ctx: CanvasRenderingContext2D) => {
            const { width } = ctx.canvas;

            let img: HTMLImageElement | null = null;

            if (active) {
                if (activeLoading) {
                    img = activeEl;
                }
            } else if (grayLoading) {
                img = grayEl;
            }
            if (!img) {
                return;
            }

            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            ctx.drawImage(img, (width - imgWidth) / 2, 0, imgWidth, imgHeight);
        };

        /**
         * 画箱子
         * @param ctx
         */
        const drawBox = (ctx: CanvasRenderingContext2D) => {
            const { width, height } = ctx.canvas;

            const lineWidth = 1;

            ctx.save();

            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = active ? "#0C2D64" : "#3E5C90";
            ctx.fillStyle = "#FFE99B";

            ctx.moveTo(1, 17);
            ctx.lineTo(3, height - 6);
            ctx.bezierCurveTo(3, height - 3, 6, height - lineWidth, 9, height - lineWidth);
            ctx.lineTo(width - 9, height - lineWidth);
            ctx.bezierCurveTo(
                width - 6,
                height - 1,
                width - lineWidth - 2,
                height - 3,
                width - lineWidth - 2,
                height - 6,
            );
            ctx.lineTo(width - lineWidth, 17);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.clip();
            //当被选中时
            if (active) {
                ctx.beginPath();
                ctx.fillStyle = "#FFDB58";
                ctx.moveTo(0, 17);
                ctx.lineTo(width, 17);
                ctx.lineTo(width, 17 + 10);
                ctx.lineTo(0, height + 10);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = "#FFB82E";
                ctx.moveTo(0, 17);
                ctx.lineTo(width, 17);
                ctx.lineTo(width, 17 + 2.5);
                ctx.lineTo(0, 15 + 17);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        };

        const drawCover = (ctx: CanvasRenderingContext2D) => {
            const { width } = ctx.canvas;

            ctx.save();

            const lineWidth = 1;
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = active ? "#0C2D64" : "#3E5C90";
            ctx.fillStyle = "#ffffff";
            ctx.moveTo(7, 12 + lineWidth / 2);
            ctx.bezierCurveTo(3.41015, 12 + 0.5, 0.5, 3.41015 + 12, lineWidth / 2, 7 + 12);
            ctx.lineTo(lineWidth / 2, 8 + 12);
            ctx.bezierCurveTo(0.5, 8.82843 + 12, 1.17157, 9.5 + 12, 2, 9.5 + 12);
            ctx.lineTo(width - 2, 9.5 + 12);
            ctx.bezierCurveTo(
                width - 2 + 0.8284,
                9.5 + 12,
                width - 2 + 1.5,
                8.82843 + 12,
                width - lineWidth / 2,
                8 + 12,
            );
            ctx.lineTo(width - lineWidth / 2, 7 + 12);
            ctx.bezierCurveTo(
                width - lineWidth / 2,
                3.41015 + 12,
                width - 4 + 0.5899,
                12 + lineWidth / 2,
                width - 7,
                12 + lineWidth / 2,
            );
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.clip();

            if (active) {
                ctx.beginPath();
                ctx.fillStyle = "#D4E1FF";
                ctx.moveTo(0, 12 + 5);
                ctx.lineTo(width, 12 + 5);
                ctx.lineTo(width, 12 + 5 + 4);
                ctx.lineTo(0, 12 + 5 + 4);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        };

        /**
         * 开始画
         */
        const draw = (ctx: CanvasRenderingContext2D) => {
            // 画柄
            drawDar(ctx);
            //画箱子
            drawBox(ctx);
            //画盖子
            drawCover(ctx);
        };

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

            draw(ctx);
        };
        getSize();
        document.fonts.addEventListener("loading", getSize);
        return () => {
            document.fonts.removeEventListener("loading", getSize);
        };
    }, [active, activeEl, activeLoading, grayEl, grayLoading]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = () => {
        onClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`item${active ? " active" : ""}`} onClick={handleClick} {...props}>
            <canvas ref={ref} className="item_icon" />
            {children}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
