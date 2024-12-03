import IconInfo from "../icons/IconInfo";
import {useState} from "react";


export default function InformationPopup({children}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return <div>
        <div className={"px-2"} onMouseEnter={() => setIsOpen(true)}
             onMouseLeave={() => setIsOpen(false)}

        >
            <div
                className={"p-2 cursor-help bg-gray-100 flex justify-center align-middle border hover:bg-gray-200 w-8 h-8 rounded"}>
                <IconInfo height={"14px"} width={"14px"}/>
            </div>
        </div>
        {isOpen && <div className={"fixed w-56 h-auto flex bg-gray-50 border shadow p-2 text-zinc-800 text-sm z-30"}>
            {children}
        </div>
        }


    </div>

}