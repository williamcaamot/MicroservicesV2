// icon:notification | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";
import {iconProps} from "@/components/common/icons/IconAddressCard";

function IconNotification({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height={height}
            width={width}
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M10 6H7a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3" />
            <path d="M20 7 A3 3 0 0 1 17 10 A3 3 0 0 1 14 7 A3 3 0 0 1 20 7 z" />
        </svg>
    );
}

export default IconNotification;
