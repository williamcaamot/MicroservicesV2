// icon:account-plus | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconAccountPlus({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={color}
            height={height}
            width={width}
        >
            <path d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 004-4 4 4 0 00-4-4 4 4 0 00-4 4 4 4 0 004 4z" />
        </svg>
    );
}
export default IconAccountPlus;
