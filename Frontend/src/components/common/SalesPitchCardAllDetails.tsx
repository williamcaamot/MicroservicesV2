import {SalesPitchType} from "./SalesPitchCard.tsx";

interface SalesPitchCardAllDetailsProps {
    salesPitch: SalesPitchType
}


const SalesPitchCardAllDetails = ({salesPitch}: SalesPitchCardAllDetailsProps) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!salesPitch.complete) {
        return <div className={"max-w-xl p-2 w-xl min-w-xl"}>
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
    }

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