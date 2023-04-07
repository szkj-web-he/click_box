import { createContext, useContext } from "react";

interface ImagContextProps {
    grayLoading: boolean;
    activeLoading: boolean;
    activeEl: React.MutableRefObject<HTMLImageElement | null>;
    grayEl: React.MutableRefObject<HTMLImageElement | null>;
}

export const ImageContext = createContext<ImagContextProps>({
    grayLoading: false,
    activeLoading: false,
    activeEl: { current: null },
    grayEl: { current: null },
});

export const useImageContext = (): ImagContextProps => useContext(ImageContext);
