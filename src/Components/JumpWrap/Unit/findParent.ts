/**
 * 找父元素
 * 直到当前这个元素是要找的那位时
 */
export const findParent = (el: HTMLElement, parent: HTMLElement): number => {
    const offsetParent = el.offsetParent;
    let top = el.offsetTop;
    if (offsetParent === parent.offsetParent) {
        return top;
    }

    let p = el.offsetParent;

    while (p !== parent && p instanceof HTMLElement) {
        top += p?.offsetTop ?? 0;
        p = p?.offsetParent ?? null;
    }
    return top;
};
