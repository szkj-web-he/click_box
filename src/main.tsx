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
import { deepCloneData, getState, OptionProps } from "./unit";
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
        return getState();
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const state: Record<string, string | null> = {};

        for (const key in activeOptions) {
            state[key] = activeOptions[key]?.code ?? null;
        }
        comms.state = state;
    }, [activeOptions]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (row: OptionProps, col: OptionProps) => {
        setActiveOptions((pre) => {
            const data = deepCloneData(pre);
            if (data[row.code]?.code === col.code) {
                data[row.code] = null;
            } else {
                data[row.code] = deepCloneData(col);
            }
            return { ...data };
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
                                className="groupTop"
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
                                            active={activeOptions?.[row.code]?.code === col.code}
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
