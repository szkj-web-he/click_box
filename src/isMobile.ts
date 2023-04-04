export const isMobile = (): boolean => {
    return window.matchMedia("(pointer:coarse)").matches;
};
