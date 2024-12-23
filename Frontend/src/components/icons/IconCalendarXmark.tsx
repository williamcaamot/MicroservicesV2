// icon:calendar-xmark | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconCalendarXmark({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            viewBox="0 0 448 512"
            fill="currentColor"
            width={width}
            height={height}
            color={color}
        >
            <path d="M257.9 328l46.2 47c10.2 9.4 10.2 24.6 0 33.1-8.5 10.2-23.7 10.2-33.1 0l-47-46.2-47.9 46.2c-8.5 10.2-23.7 10.2-33.1 0-9.3-8.5-9.3-23.7 0-33.1l47.1-47-47.1-47.9c-9.3-8.5-9.3-23.7 0-33.1 9.4-9.3 24.6-9.3 33.1 0l47.9 47.1 47-47.1c9.4-9.3 24.6-9.3 33.1 0 10.2 9.4 10.2 24.6 0 33.1L257.9 328zM128 0c13.3 0 24 10.75 24 24v40h144V24c0-13.25 10.7-24 24-24s24 10.75 24 24v40h40c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V128c0-35.35 28.65-64 64-64h40V24c0-13.25 10.7-24 24-24zm272 192H48v256c0 8.8 7.16 16 16 16h320c8.8 0 16-7.2 16-16V192z" />
        </svg>
    );
}

export default IconCalendarXmark;
