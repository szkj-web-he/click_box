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
