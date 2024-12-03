import IconX from "../icons/IconX";

export default function Modal({ isOpen, onClose, title, children }){

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative w-auto max-w-3xl mx-auto my-6 z-50">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="text-xl flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t">
                        <span className={"pt-2"}>{title}</span>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={onClose}
                        >
                        <IconX/>
                        </button>

                    </div>

                    <div className="relative p-6 flex-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};