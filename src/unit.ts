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

export const deepCloneData = <T>(res: T): T => {
    if (typeof res === "object") {
        return JSON.parse(JSON.stringify(res)) as T;
    }
    return res;
};

export const getState = (): OptionProps[] => {
    const state = comms.state as Record<string, "1" | "0">;
    const options = comms.config.options ?? [];
    const arr: Array<OptionProps> = [];
    for (const key in state) {
        const keyVal = key.split("#")[1];
        if (state[key] === "1") {
            const data = options.find((item) => item.code === keyVal);
            data && arr.push(deepCloneData(data));
        }
    }
    return arr;
};
