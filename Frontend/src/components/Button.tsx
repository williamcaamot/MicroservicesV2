// Source: Generated by Claude.AI
// I'm typically using Claude instead of a component library to get more control over the components I use


const Button = ({ onClick, disabled, loading, children }) => {
    const baseClasses = "px-4 py-2 font-bold rounded transition-all duration-300 focus:outline-none";
    const activeClasses = disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white transform hover:scale-105 active:scale-95";

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${activeClasses}`}
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : null}
            {children}
        </button>
    );
};

export default Button;