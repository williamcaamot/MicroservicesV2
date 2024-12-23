// icon:money-bill-slash | Unicons https://iconscout.com/unicons | Iconscout
import * as React from "react";
import {iconProps} from "./IconAddressCard";

function IconMoneyBillSlash({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            data-name="Layer 1"
            viewBox="0 0 24 24"
            fill={color}
            height={height}
            width={width}
        >
            <path d="M6 11a1 1 0 101 1 1 1 0 00-1-1zm5.86-1.55L4.71 2.29a1 1 0 00-1.42 1.42L4.59 5H4a3 3 0 00-3 3v8a3 3 0 003 3h14.59l2.7 2.71a1 1 0 001.42 0 1 1 0 000-1.42zm-.74 2.09l1.34 1.34A1 1 0 0112 13a1 1 0 01-1-1 1 1 0 01.12-.46zM4 17a1 1 0 01-1-1V8a1 1 0 011-1h2.59l3.1 3.1A3 3 0 009 12a3 3 0 003 3 3 3 0 001.9-.69L16.59 17zM20 5h-7.34a1 1 0 000 2H20a1 1 0 011 1v7.34a1 1 0 102 0V8a3 3 0 00-3-3zm-1 7a1 1 0 10-1 1 1 1 0 001-1z" />
        </svg>
    );
}

export default IconMoneyBillSlash;
