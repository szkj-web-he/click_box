import { comms } from ".";

export interface OptionProps {
    code: string;
    content: string;
}

export const getScrollBody = (node: HTMLElement | null): HTMLElement | undefined => {
    if (!node) {
        return;
    }

    let el: null | HTMLElement = null;
    const childList = node.children;
    for (let i = 0; i < childList.length; ) {
        const child = childList[i];
        const className = child.getAttribute("class");
        if (className?.includes("scroll_scrollBody") && child instanceof HTMLElement) {
            i = childList.length;
            el = child;
        } else {
            ++i;
        }
    }

    if (!el) {
        return;
    }
    return el;
};

export const getScrollValue = (): {
    x: number;
    y: number;
} => {
    let x = window.scrollX || window.pageXOffset;
    let y = window.scrollY || window.pageYOffset;
    const node = document.documentElement || document.body.parentNode;
    if (!x) {
        x = (typeof node.scrollLeft === "number" ? node : document.body).scrollLeft;
    } else if (!y) {
        y = (typeof node.scrollTop === "number" ? node : document.body).scrollTop;
    }
    return {
        x,
        y,
    };
};

// 画医药箱的柄
const drawDar = (
    ctx: CanvasRenderingContext2D,
    active: boolean,
    activeEl: HTMLImageElement | null,
    activeLoading: boolean,
    grayEl: HTMLImageElement | null,
    grayLoading: boolean,
    blur?: number,
) => {
    let { width } = ctx.canvas;
    if (blur) {
        width -= blur * 2;
    }

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
 * 画医药箱的箱子
 * @param ctx
 */
const drawBox = (ctx: CanvasRenderingContext2D, active: boolean, blur?: number) => {
    let { width, height } = ctx.canvas;
    if (blur) {
        width -= blur * 2;
        height -= blur * 2;
    }
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
/**
 * 画医药箱的盖子
 */
const drawCover = (ctx: CanvasRenderingContext2D, active: boolean, blur?: number) => {
    let { width } = ctx.canvas;

    if (blur) {
        width -= blur * 2;
    }

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
 * 画医药箱
 */
export const drawMedicineCabinet = (
    ctx: CanvasRenderingContext2D,
    active: boolean,
    activeEl: HTMLImageElement | null,
    activeLoading: boolean,
    grayEl: HTMLImageElement | null,
    grayLoading: boolean,
    blur?: number,
): void => {
    drawDar(ctx, active, activeEl, activeLoading, grayEl, grayLoading, blur);
    drawBox(ctx, active, blur);
    drawCover(ctx, active, blur);
};

export const deepCloneData = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data)) as T;
};
/**
 * 答案回溯
 */
export const getState = (): Record<string, Array<OptionProps>> => {
    const state = comms.state as Record<string, string>;
    const stateData: Record<string, Array<OptionProps>> = {};

    const rows = comms.config.options?.[0] ?? [];
    const cols = comms.config.options?.[1] ?? [];
    for (const keyStr in state) {
        const key = keyStr.split("#")[1];
        const keys = key.includes("_") ? key.split("_") : "";
        const rowCode = keys[0];
        const colCode = keys[1];
        if (state[keyStr] === "1") {
            const col = cols.find((item) => item.code === colCode);
            if (Array.isArray(stateData[rowCode])) {
                col && stateData[rowCode].push(deepCloneData(col));
            } else if (col) {
                stateData[rowCode] = [deepCloneData(col)];
            }
        }
    }

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!Array.isArray(stateData[row.code])) {
            stateData[row.code] = [];
        }
    }

    return stateData;
};
