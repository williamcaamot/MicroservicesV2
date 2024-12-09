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

interface SalesPitchCardProps {
    salesPitch: SalesPitchType
}


const SalesPitchCard = ({salesPitch}: SalesPitchCardProps) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={"max-w-xl p-2"}>
        <div
            className=" w-full mb-4 rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition-shadow">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Sales Pitch {salesPitch.salesPitchId}</h3>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="space-y-4">
                    <div>
                        <p className="mt-1 text-sm whitespace-pre-wrap">{salesPitch.salesPitch}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SalesPitchCard;