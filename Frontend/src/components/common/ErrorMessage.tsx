type ErrorMessageProps = {
    message: string;
    onClose: () => void;
    className?: string;
}

const ErrorMessage = ({ message, onClose, className = '' }: ErrorMessageProps) => {
    return (
        <div className={`bg-red-50 border-l-4 border-red-500 p-4 relative ${className}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <span className="text-red-500">⚠️</span>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8"
                >
                    <span className="sr-only">Close</span>
                    <span className="text-xl">&times;</span>
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
