
export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img src={"/logo.png"}/>
                </div>
                {children}
            </div>
        </div>
    );
}
