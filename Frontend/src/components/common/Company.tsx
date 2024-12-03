import {Company} from "../../app/CompanyManager";
import {useNavigate, useParams} from "react-router-dom";

type CompanyListProps = {
    companies: Company[];
    onViewDetails: (id: number) => void;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function CompanyList({ companies, onViewDetails, onUpdate, onDelete }){
    const navigate = useNavigate();
    const {workspaceId} = useParams();

    if(companies.length > 0) return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Org. Number</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {companies && companies.map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50"
                            onClick={() => {navigate(`/app/workspace/${workspaceId}/company/${company.id}`)}}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{company.navn}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{company.organisasjonsnummer}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onViewDetails(company.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => onUpdate(company.id)}
                                        className="text-green-600 hover:text-green-900 mr-3"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => onDelete(company.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};