// icon:bxs-dashboard | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";
import {iconProps} from "@/components/common/icons/IconAddressCard";

function IconBxsDashboard({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={color}
            height={height}
            width={width}

        >
            <path
                d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm-1 7a1 1 0 001 1h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4zm10 0a1 1 0 001 1h6a1 1 0 001-1v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1v7zm1-10h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z"/>
        </svg>
    );
}

export default IconBxsDashboard;
