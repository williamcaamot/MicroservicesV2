import { Link } from 'react-router-dom';
import {SalesPitchType} from "./SalesPitchCard.tsx";

interface CompanyDetails {
    name: string;
    industry?: string;
    website?: string;
    employees?: number;
}

interface EnhancedSalesPitchType extends SalesPitchType {
    company?: CompanyDetails;
}

interface SalesPitchCardAllDetailsProps {
    salesPitch: EnhancedSalesPitchType;
}

const SalesPitchCardAllDetails = ({salesPitch}: SalesPitchCardAllDetailsProps) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!salesPitch.complete) {
        return (
            <div className="max-w-xl p-2">
                <div className="w-full mb-4 rounded-lg border border-gray-200 bg-white shadow p-4">
                    <div className="animate-pulse space-y-4">
                        <div className="flex justify-between">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            <div className="h-20 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            <div className="h-32 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl p-2">
            <div className="w-full mb-4 rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition-shadow">
                <div className="p-4 border-b border-gray-200">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Sales Pitch #{salesPitch.salesPitchId}</h3>
                            <span className="text-sm text-gray-500">{formatDate(salesPitch.createdAt)}</span>
                        </div>

                        <Link
                            to={`/app/workspace/${salesPitch.workspaceId}/company/${salesPitch.companyId}`}
                            className="block hover:bg-gray-50 -mx-4 px-4 py-2"
                        >
                            <div className="space-y-1">
                                <h4 className="font-medium text-blue-600 hover:text-blue-800">
                                    {salesPitch.company?.name || `Company #${salesPitch.companyId}`}
                                </h4>
                                {salesPitch.company && (
                                    <div className="text-sm text-gray-500 space-y-1">
                                        {salesPitch.company.industry && (
                                            <p>Industry: {salesPitch.company.industry}</p>
                                        )}
                                        {salesPitch.company.employees && (
                                            <p>Employees: {salesPitch.company.employees}</p>
                                        )}
                                        {salesPitch.company.website && (
                                            <p>Website: {salesPitch.company.website}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Generated Sales Pitch</h4>
                            <p className="text-sm whitespace-pre-wrap">{salesPitch.salesPitch}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPitchCardAllDetails;