


// icon:check-circle | Feathericons https://feathericons.com/ | Cole Bemis
import * as React from "react";

export interface iconProps{
    color?: string,
    height?: string,
    width?: string,
}

function IconChecked({color = "currentColor", height="1em", width="1em"}:iconProps) {
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
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
        </svg>
    );
}

export default IconChecked;
