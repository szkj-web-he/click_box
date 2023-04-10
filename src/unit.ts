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

export const draw = (ctx: CanvasRenderingContext2D, isBlur = false): void => {
    const { width, height } = ctx.canvas;
    const margin = 1;
    let color = "#000";
    let padding = 8;
    let lineWidth = 0.5;
    if (isBlur) {
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

/**
 * 找出最小的number
 */
const findMin = (arr: Array<number>) => {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        const val = arr[i];
        if (val < min) {
            min = val;
        }
    }
    return min;
};

/**
 * 获取小数位
 * @param args
 */
const fetchDecimal = (num: number) => {
    const numStr = num.toString();
    return numStr.includes(".") ? numStr.split(".")[1].length : 0;
};

/**
 * 将所有的数字扩大相应的倍数
 *
 * 产生新的数字
 */

const toBigForNumber = (arr: Array<number>, type: "+" | "-") => {
    const minVal = findMin(arr);
    const length = fetchDecimal(minVal);
    const expansion = 10 ** length;

    let total = arr[0] * expansion;
    for (let i = 1; i < arr.length; i++) {
        const value = arr[i] * expansion;
        if (type === "-") {
            total -= value;
        } else {
            total += value;
        }
    }
    return total / expansion;
};
/**
 * 相加
 */
export const sum = (...args: Array<number>): number => {
    return toBigForNumber(args, "+");
};
export const deepCloneData = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data)) as T;
};
/**
 * 答案回溯
 */
export const getState = (): Record<string, OptionProps | null> => {
    const state = comms.state as Record<string, string>;
    const stateData: Record<string, string> = {};
    for (const key in state) {
        stateData[key.split("#")[1]] = state[key];
    }

    const rows = comms.config.options?.[0] ?? [];

    const cols = comms.config.options?.[1] ?? [];

    const data: Record<string, OptionProps | null> = {};

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        const col = cols.find((item) => item.code === stateData[row.code]);

        data[row.code] = col ? deepCloneData(col) : null;
    }
    return data;
};
