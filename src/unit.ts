import { isMobile } from "./isMobile";

export interface OptionProps {
    code: string;
    content: string;
}

export const getScrollBody = (node: HTMLDivElement | null): HTMLElement | undefined => {
    if (!node) {
        return;
    }

    if (isMobile()) {
        return node;
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
// if (el.offsetHeight < el.scrollHeight) {
//     setBottomActive(!(el.offsetHeight + el.scrollTop >= el.scrollHeight));
//     setTopActive(!!el.scrollTop);
// }
