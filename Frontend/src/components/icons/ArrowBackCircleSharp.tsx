import * as React from "react";
import {iconProps} from "./IconAddressCard";

export function IconArrowBackCircleSharp({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill={color}
            height={height}
            width={width}
        >
            <path d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm224-80.09L208.42 240H358v32H208.42L272 336.09l-22.7 22.54L147.46 256 249.3 153.37z" />
        </svg>
    );
}