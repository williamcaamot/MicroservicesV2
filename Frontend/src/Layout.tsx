import {Link, useNavigate} from "react-router-dom";

export default function Layout({children}) {

    const navigate = useNavigate();

    return (
        <div className="w-full flex justify-center">
            <div className="flex w-full h-screen bg-gray-100">
                {/* Vertical Menu */}
                <nav className="w-64 bg-white shadow-lg">
                    <div className="p-4">
                        <h1 className="text-xl font-bold text-gray-800">DealFlow</h1>
                    </div>
                    <ul className="space-y-2 p-4">
                        <li onClick={() => {navigate("/app")}}><a className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Hjem</a></li>
                        <li onClick={() => {navigate("/app/selskaper")}}><a className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Selskaper</a></li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-auto">
                    <div className="w-full bg-white shadow-lg rounded-lg p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}