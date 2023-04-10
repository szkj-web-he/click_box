import React from "react";
import "./font.scss";
import "./style.scss";

import { ConfigYML, PluginComms } from "@datareachable/dr-plugin-sdk";
import Header from "./header";
import MainContent from "./main";

import flowerIcon from "./Image/bg_flower.png";
import footerIcon from "./Image/bg_footerIcon.png";

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
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            <img alt="" src={flowerIcon} className="flowerIcon" />
            <div className="footerWrap">
                <img alt="" src={footerIcon} className="footerIcon" />
            </div>
            <div className="wrapper_body">
                <Header />
                <MainContent />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
