import {iconProps} from "./IconAddressCard";


export default function IconCheck({color = "currentColor", height="1em", width="1em"}:iconProps) {
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            width={width}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>
)
}