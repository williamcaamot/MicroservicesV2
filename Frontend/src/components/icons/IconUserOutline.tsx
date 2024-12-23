// icon:user | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconUserOutline({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            viewBox="0 0 448 512"
            fill="currentColor"
            height={height}
            width={width}
            color={color}
        >
            <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32 0-97.2-78.8-176-176-176zM48.99 464c7.9-63.1 61.81-112 127.01-112h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128S294.69 0 224 0 96 57.31 96 128c0 70.7 57.3 128 128 128zm0-208c44.11 0 80 35.89 80 80s-35.89 80-80 80-80-35.9-80-80c0-44.11 35.9-80 80-80z" />
        </svg>
    );
}

export default IconUserOutline;
