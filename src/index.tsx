import React, { useRef, useState } from "react";
import "./font.scss";
import "./style.scss";

import { ConfigYML, PluginComms } from "@possie-engine/dr-plugin-sdk";
import Header from "./header";
import MainContent from "./main";
import bgIcon from "./Image/bg_icon.png";
import iconActive from "./Image/icon_barActive.png";
import iconGray from "./Image/icon_barGray.png";
import { ImageContext } from "./context";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        optionsInstruction?: string;
        options?: Array<{ code: string; content: string }>;
    };
    state: unknown;
    renderOnReady: (res: React.ReactNode) => void;
};

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [activeIconLoading, setActiveIconLoading] = useState(false);

    const [grayIconLoading, setGrayIconLoading] = useState(false);

    const activeRef = useRef<HTMLImageElement | null>(null);

    const grayRef = useRef<HTMLImageElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            <div className="wrapper_body">
                <Header />
                <ImageContext.Provider
                    value={{
                        grayLoading: grayIconLoading,
                        activeLoading: activeIconLoading,
                        activeEl: activeRef.current,
                        grayEl: grayRef.current,
                    }}
                >
                    <MainContent />
                </ImageContext.Provider>
            </div>

            <img src={bgIcon} className="wrapper_bgIcon" alt="" />
            <img
                src={iconActive}
                alt=""
                ref={activeRef}
                onLoad={() => setActiveIconLoading(true)}
                className="wrapper_btnIcon"
            />
            <img
                src={iconGray}
                alt=""
                ref={grayRef}
                onLoad={() => setGrayIconLoading(true)}
                className="wrapper_btnIcon"
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
