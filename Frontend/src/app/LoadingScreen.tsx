export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="relative w-48 h-48 p-4 bg-white rounded-full shadow-lg">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        className="w-[70%] h-[70%] object-contain"
                        src="/favicon.png"
                        alt="Loading"
                    />
                </div>
            </div>
        </div>
    );
}