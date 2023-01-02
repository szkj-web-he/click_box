import { createContext, useContext } from "react";

interface ImagContextProps {
    grayLoading: boolean;
    activeLoading: boolean;
    activeEl: HTMLImageElement | null;
    grayEl: HTMLImageElement | null;
}

export const ImageContext = createContext<ImagContextProps>({
    grayLoading: false,
    activeLoading: false,
    activeEl: null,
    grayEl: null,
});

export const useImageContext = (): ImagContextProps => useContext(ImageContext);
