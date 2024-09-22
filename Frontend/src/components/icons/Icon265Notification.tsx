// icon:265-notification | Icomoon https://icomoon.io/ | Keyamoon
import * as React from "react";
import {iconProps} from "@/components/common/icons/IconAddressCard";

function Icon265Notification({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill={color}
            height={height}
            width={width}
        >
            <path
                fill={color}
                d="M8 1.5c-1.736 0-3.369.676-4.596 1.904S1.5 6.264 1.5 8c0 1.736.676 3.369 1.904 4.596S6.264 14.5 8 14.5c1.736 0 3.369-.676 4.596-1.904S14.5 9.736 14.5 8c0-1.736-.676-3.369-1.904-4.596S9.736 1.5 8 1.5zM8 0a8 8 0 110 16A8 8 0 018 0zM7 11h2v2H7zm0-8h2v6H7z"
            />
        </svg>
    );
}

export default Icon265Notification;
