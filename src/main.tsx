/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
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
    const [activeCode, setActiveCode] = useState<OptionProps | undefined>(() => {
        const state = comms.state as Record<string, string>;
        const options = comms.config.options ?? [];
        let value = "";
        for (const key in state) {
            value = state[key];
        }

        return options.find((item) => item.code === value);
    });
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        comms.state = activeCode?.code ?? null;
    }, [activeCode]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (item: OptionProps) => {
        if (activeCode?.code === item.code) {
            setActiveCode(undefined);
            return;
        }
        setActiveCode({ ...item });
    };

    const list = comms.config.options ?? [];

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="main">
            <div className="total">
                共<span className="totalValue">{list.length}</span>项
            </div>
            <div className="mainContainer">
                {list.map((item) => {
                    return (
                        <Item
                            data={{ ...item }}
                            key={item.code}
                            active={activeCode?.code === item.code}
                            onClick={() => handleClick(item)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
