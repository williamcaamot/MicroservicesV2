import { useState, useEffect } from "react";

interface rightDrawerProps{
    isOpen: boolean,
    setIsOpen: (arg0: boolean) => void,
    children: React.ReactNode,
    title: string
}


export default function RightDrawer({ isOpen, setIsOpen, children, title }: rightDrawerProps) {

    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isOpen) {
            setAnimationClass("translate-x-0");
        } else {
            setAnimationClass("translate-x-full");
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-gray-500 bg-opacity-30 z-30 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full min-w-[400px] w-1/4 p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${animationClass}`}
            >
                <h5 id="drawer-right-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    {title}
                </h5>
                <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                {children}
            </div>
        </>
    );
}