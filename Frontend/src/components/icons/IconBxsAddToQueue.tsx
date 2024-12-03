// icon:bxs-add-to-queue | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconBxsAddToQueue({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={color}
            height={height}
            width={width}
        >
            <path d="M4 22h12v-2H4V8H2v12c0 1.103.897 2 2 2z" />
            <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-2 9h-3v3h-2v-3h-3V9h3V6h2v3h3v2z" />
        </svg>
    );
}

export default IconBxsAddToQueue;
