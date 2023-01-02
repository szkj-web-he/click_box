/**
 * @file 三角形
 * @date 2022-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<React.SVGAttributes<SVGSVGElement>> = ({ ...props }) => {
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
        <svg
            width="22"
            height="15"
            viewBox="0 0 22 15"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.6637 1.95674C11.7449 1.03786 10.2551 1.03786 9.33618 1.95674L1.30957 9.98334C-0.172696 11.4656 0.877108 14.0001 2.97335 14.0001H19.0266C21.1228 14.0001 22.1726 11.4656 20.6903 9.98334L12.6637 1.95674Z"
                fill="currentColor"
                stroke="#0C2D64"
            />
        </svg>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
