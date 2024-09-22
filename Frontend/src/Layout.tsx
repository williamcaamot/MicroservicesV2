import {Link, useNavigate, useParams} from "react-router-dom";

export default function Layout({children}) {
    const navigate = useNavigate();
    let {workspaceId} = useParams();


    return (
        <div className="w-full flex justify-center">
            <div className="flex w-full h-screen bg-gray-100">
                {/* Vertical Menu */}
                <nav className="w-52 bg-white borde-r shadow-sms">
                    <div className="p-4">
                        <h1 className="text-xl font-bold text-gray-800">DealFlow</h1>
                    </div>
                    <ul className="space-y-2 p-4">
                        <li onClick={() => {navigate("/app")}}><a className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Dashboard</a></li>
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}/selskaper`)}}><a className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Selskaper</a></li>
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}/selskaper`)}}><a className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Leads</a></li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-auto">
                    <div className="w-full bg-white shadow-sm border rounded-lg p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}