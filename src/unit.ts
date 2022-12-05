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
