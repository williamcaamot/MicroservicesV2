


export interface SalesPitchType {
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy?: string;
    salesPitchId: number;
    companyId: number;
    workspaceId: number;
    salesPitch: string;
    prompt: string;
    isComplete: boolean;
}

interface SalesPitchCardProps{
    salesPitch: SalesPitchType
}


const SalesPitchCard = ({ salesPitch }: SalesPitchCardProps) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full mb-4 rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition-shadow">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Sales Pitch #{salesPitch.salesPitchId}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            salesPitch.isComplete ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
              {salesPitch.isComplete ? 'Complete' : 'In Progress'}
            </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>📅</span>
                            {formatDate(salesPitch.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span>👤</span>
                            {salesPitch.createdBy}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Prompt</h4>
                        <p className="mt-1 text-sm whitespace-pre-wrap">{salesPitch.prompt}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Sales Pitch</h4>
                        <p className="mt-1 text-sm whitespace-pre-wrap">{salesPitch.salesPitch}</p>
                    </div>
                </div>
            </div>

            {salesPitch.updatedAt && (
                <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 rounded-b-lg">
                    Last updated by {salesPitch.updatedBy} on {formatDate(salesPitch.updatedAt)}
                </div>
            )}
        </div>
    );
};

export default SalesPitchCard;