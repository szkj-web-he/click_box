import "./font.scss";
import "./style.scss";
import "./elementsFromPointPolyfill.ts";
import React, { useEffect, useState } from "react";

import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";
import Header from "./header";
import MainContent from "./main";

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
    const [loading, setLoading] = useState(true);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        void document.fonts.ready.then(() => {
            setLoading(false);
        });
    }, []);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            {loading && <>加载字体中……</>}
            <div
                style={
                    loading
                        ? {
                              height: 0,
                              opacity: 0,
                          }
                        : {}
                }
            >
                <Header />
                <MainContent />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
