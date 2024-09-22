// icon:rename | CSS Icons https://css.gg/ | Astrit
import * as React from "react";
import {iconProps} from "@/components/common/icons/IconAddressCard";

function IconRename({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            height={height}
            width={width}
        >
            <path
                fill={color}
                fillRule="evenodd"
                d="M10 4H8v2H5a3 3 0 00-3 3v6a3 3 0 003 3h3v2h2V4zM8 8v8H5a1 1 0 01-1-1V9a1 1 0 011-1h3z"
                clipRule="evenodd"
            />
            <path
                fill={color}
                d="M19 16h-7v2h7a3 3 0 003-3V9a3 3 0 00-3-3h-7v2h7a1 1 0 011 1v6a1 1 0 01-1 1z"
            />
        </svg>
    );
}

export default IconRename;
