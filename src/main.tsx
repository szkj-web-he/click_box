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
        const rows = comms.config.options?.[0] ?? [];
        const cols = comms.config.options?.[1] ?? [];

        const state: Record<string, Record<string, "0" | "1">> = {};

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const data = activeOptions?.[row.code];
            for (let j = 0; j < cols.length; j++) {
                const col = cols[j];
                const status = col.code === data.code;

                state[row.code] = Object.assign({}, state[row.code], {
                    [col.code]: status ? "1" : "0",
                });
            }
        }
        comms.state = state;
    }, [activeOptions]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (row: OptionProps, col: OptionProps) => {
        setActiveOptions((pre) => {
            pre[row.code] = { ...col };
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
                        {n > 0 && <div className="blank" />}
                        <div className="col">
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
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{ __html: col.content }}
                                            />
                                        </Item>
                                    );
                                })}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
