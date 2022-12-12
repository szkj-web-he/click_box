/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useState } from "react";
import { comms } from ".";
import Item from "./item";
import { OptionProps } from "./unit";
import { useEffect } from "react";
import { Group } from "./Component/Group";
import Hr from "./hr";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [activeOptions, setActiveOptions] = useState(() => {
        const arr = comms.config.options?.[0] ?? [];
        const state: Record<string, OptionProps> = {};
        for (let i = 0; i < arr.length; i++) {
            state[arr[i].code] = { code: "", content: "" };
        }
        return { ...state };
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const state: Record<string, string> = {};

        for (const key in activeOptions) {
            state[key] = activeOptions[key].code;
        }
        comms.state = state;
    }, [activeOptions]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (row: OptionProps, col: OptionProps) => {
        setActiveOptions((pre) => {
            pre[row.code] =
                pre[row.code].code === col.code ? { code: "", content: "" } : { ...col };
            return { ...pre };
        });
    };

    const cols = comms.config.options?.[1] ?? [];

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="main">
            {comms.config.options?.[0].map((row, n) => {
                return (
                    <Fragment key={row.code}>
                        {n > 0 && <Hr />}
                        <Group className="row" index={n}>
                            <div
                                className="question"
                                dangerouslySetInnerHTML={{
                                    __html: row.content,
                                }}
                            />

                            <div className="total">
                                共<span className="totalValue">{cols.length}</span>项
                            </div>
                            <div className="mainContainer">
                                {cols.map((col) => {
                                    return (
                                        <Item
                                            key={col.code}
                                            active={activeOptions?.[row.code].code === col.code}
                                            onClick={() => handleClick(row, col)}
                                            data={{ ...col }}
                                        />
                                    );
                                })}
                            </div>
                        </Group>
                    </Fragment>
                );
            })}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
