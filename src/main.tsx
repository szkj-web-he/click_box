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
import { getState } from "./unit";
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
        const rows = comms.config.options?.[0] ?? [];
        const cols = comms.config.options?.[1] ?? [];

        const state: Record<string, Record<string, "0" | "1">> = {};

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const arr = activeOptions?.[row.code] ?? [];
            for (let j = 0; j < cols.length; j++) {
                let status = false;
                const col = cols[j];

                for (let k = 0; k < arr.length; ) {
                    const item = arr[k];
                    if (item.code === col.code) {
                        status = true;
                        k = arr.length;
                    } else {
                        ++k;
                    }
                }

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
            const data = { ...pre };
            const arr = [...data[row.code]];
            let n = -1;
            for (let i = 0; i < arr.length; ) {
                if (arr[i].code === col.code) {
                    n = i;
                    i = arr.length;
                } else {
                    ++i;
                }
            }

            if (n >= 0) {
                arr.splice(n, 1);
            } else {
                arr.push({ ...col });
            }
            data[row.code] = [...arr];
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
                                            active={activeOptions?.[row.code].some(
                                                (data) => data.code === col.code,
                                            )}
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
