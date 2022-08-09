import "./font.scss";
import "./style.scss";
import "./elementsFromPointPolyfill.ts";
import React, { useEffect, useRef, useState } from "react";

import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";
import Header from "./header";
import MainContent from "./main";
import { ScrollComponent } from "./Scroll";
import { isMobile } from "./isMobile";
import { getScrollBody } from "./unit";
import Triangle from "./triangle";

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

    const ref = useRef<HTMLDivElement | null>(null);

    const [show, setShow] = useState(false);
    const [topActive, setTopActive] = useState(false);
    const [bottomActive, setBottomActive] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        void document.fonts.ready.then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        let timer: null | number = null;
        if (!loading) {
            const fn = () => {
                const scrollBody = getScrollBody(ref.current);
                if (scrollBody && scrollBody.offsetHeight < scrollBody.scrollHeight) {
                    setShow(true);
                    setBottomActive(
                        !(
                            scrollBody.offsetHeight + scrollBody.scrollTop >=
                            scrollBody.scrollHeight
                        ),
                    );
                    setTopActive(!!scrollBody.scrollTop);
                    return;
                }
                setShow(false);
                setBottomActive(false);
                setTopActive(false);
            };

            timer = window.setTimeout(fn);
        }
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, [loading]);

    useEffect(() => {
        const fn = () => {
            const scrollBody = getScrollBody(ref.current);
            if (scrollBody && scrollBody.offsetHeight < scrollBody.scrollHeight) {
                setShow(true);
                setBottomActive(
                    !(scrollBody.offsetHeight + scrollBody.scrollTop >= scrollBody.scrollHeight),
                );
                setTopActive(!!scrollBody.scrollTop);
                return;
            }
            setShow(false);
            setBottomActive(false);
            setTopActive(false);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    });
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleScroll = () => {
        const scrollBody = getScrollBody(ref.current);
        if (scrollBody) {
            setShow(true);
            setBottomActive(
                !(scrollBody.offsetHeight + scrollBody.scrollTop >= scrollBody.scrollHeight),
            );
            setTopActive(!!scrollBody.scrollTop);
            return;
        }
        setShow(false);
        setBottomActive(false);
        setTopActive(false);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const content = (
        <>
            <Header />
            <MainContent />
        </>
    );
    const mobile = isMobile();
    return (
        <div className="wrapper">
            {loading && <>加载字体中……</>}
            {mobile ? (
                <div
                    className="mobileScroll"
                    ref={ref}
                    onScroll={handleScroll}
                    style={
                        loading
                            ? {
                                  height: 0,
                                  opacity: 0,
                              }
                            : {}
                    }
                >
                    {content}
                </div>
            ) : (
                <ScrollComponent
                    handleBarChange={handleScroll}
                    style={
                        loading
                            ? {
                                  height: 0,
                                  opacity: 0,
                              }
                            : {}
                    }
                    ref={ref}
                >
                    {content}
                </ScrollComponent>
            )}
            {show && (
                <div className="floating_button">
                    <div
                        className="toTop_button"
                        onClick={() => {
                            const scrollBody = getScrollBody(ref.current);
                            if (!scrollBody) {
                                return;
                            }
                            scrollBody.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <Triangle
                            className="top_triangle"
                            color={topActive ? "#4D4D4D" : "#EBEBEB"}
                        />
                    </div>
                    <div
                        className="toBottom_button"
                        onClick={() => {
                            const scrollBody = getScrollBody(ref.current);
                            if (!scrollBody) {
                                return;
                            }
                            scrollBody.scrollTo({
                                top: scrollBody.scrollHeight - scrollBody.offsetHeight,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <Triangle
                            className="bottom_triangle"
                            color={bottomActive ? "#4D4D4D" : "#EBEBEB"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
