import React, { useEffect, useState } from "react";
import "./elementsFromPointPolyfill.ts";
import "./font.scss";
import "./style.scss";

import { ConfigYML, PluginComms } from "@possie-engine/dr-plugin-sdk";
import JumpWrap from "./Components/jumpWrap";
import Header from "./header";
import MainContent from "./main";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        optionsInstruction?: string;
        options?: Array<Array<{ code: string; content: string }>>;
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
            <JumpWrap
                style={
                    loading
                        ? {
                              opacity: 0,
                              pointerEvents: "none",
                          }
                        : {}
                }
            >
                <Header />
                <MainContent />
            </JumpWrap>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
