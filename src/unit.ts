import { comms } from ".";

export interface OptionProps {
    code: string;
    content: string;
}

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

const deepCloneData = <T>(res: T): T => {
    if (typeof res === "object") {
        return JSON.parse(JSON.stringify(res)) as T;
    }
    return res;
};

export const getState = ():
    | {
          code: string;
          content: string;
      }
    | undefined => {
    const state = comms.state as Record<string, string>;

    let answer = "";
    for (const key in state) {
        answer = state[key];
    }

    const options = comms.config.options ?? [];

    const data = options.find((item) => item.code === answer);
    return data ? deepCloneData(data) : undefined;
};

export const draw = (ctx: CanvasRenderingContext2D, isBlur = false): void => {
    const { width, height } = ctx.canvas;
    let margin = 1;
    let color = "#000";
    let padding = 8;
    let lineWidth = 0.5;
    if (isBlur) {
        margin = 1;
        lineWidth = 1;
        padding = 8.5;
        color = "rgba(129, 38, 0, 0.6)";
    }
    const startX = margin - lineWidth / 2;
    const startY = margin - lineWidth / 2;
    const endX = width - margin;
    const endY = height - margin;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

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
