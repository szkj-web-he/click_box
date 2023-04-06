import { comms } from ".";

export interface OptionProps {
    code: string;
    content: string;
}

/**
 * 深克隆
 */
export const deepCloneData = <T>(data: T): T => {
    if (data == null) {
        return data;
    }

    return JSON.parse(JSON.stringify(data)) as T;
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
