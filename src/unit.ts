import { comms } from ".";

export interface OptionProps {
    code: string;
    content: string;
}

export const deepCloneData = <T>(res: T): T => {
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
