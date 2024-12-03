import {iconProps} from "./IconAddressCard";


export default function IconX({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height={height}
            width={width}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    )
}