// icon:list-circle-outline | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconListCircleOutline({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height={height}
            width={width}
            color={color}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M224 184h128M224 256h128M224 327h128"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M176 184 A8 8 0 0 1 168 192 A8 8 0 0 1 160 184 A8 8 0 0 1 176 184 z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M176 257 A8 8 0 0 1 168 265 A8 8 0 0 1 160 257 A8 8 0 0 1 176 257 z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M176 328 A8 8 0 0 1 168 336 A8 8 0 0 1 160 328 A8 8 0 0 1 176 328 z"
            />
        </svg>
    );
}

export default IconListCircleOutline;
