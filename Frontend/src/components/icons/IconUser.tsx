// icon:user | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconUser({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            viewBox="0 0 448 512"
            fill={color}
            height={height}
            width={width}
        >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
        </svg>
    );
}

export default IconUser;
