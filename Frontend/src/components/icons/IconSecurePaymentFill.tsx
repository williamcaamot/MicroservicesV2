// icon:secure-payment-fill | Remix Icon https://remixicon.com/ | Remix Design
import * as React from "react";
import {iconProps} from "@/components/common/icons/IconAddressCard";

function IconSecurePaymentFill({color = "currentColor", height = "1em", width = "1em"}: iconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={color}
            height={height}
            width={width}
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 2l7.298 2.28a1 1 0 01.702.955V7h2a1 1 0 011 1v2H9V8a1 1 0 011-1h7V5.97l-6-1.876L5 5.97v7.404a4 4 0 001.558 3.169l.189.136L11 19.58 14.782 17H10a1 1 0 01-1-1v-4h13v4a1 1 0 01-1 1l-3.22.001c-.387.51-.857.96-1.4 1.33L11 22l-5.38-3.668A6 6 0 013 13.374V5.235a1 1 0 01.702-.954L11 2z" />
        </svg>
    );
}

export default IconSecurePaymentFill;
