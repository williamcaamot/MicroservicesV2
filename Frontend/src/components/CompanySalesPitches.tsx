import SalesPitchCard from "./SalesPitchCard.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const CompanySalesPitches = ({ isGeneratingSalesPitchLoading }) => {
    const { companyId, workspaceId } = useParams();
    const [salesPitches, setSalesPitches] = useState();
    const [isSalesPitchesLoading, setIsSalesPitchesLoading] = useState(false);
    const [isPolling, setIsPolling] = useState<boolean>(true);

    async function fetchSalesPitches() {
        setIsSalesPitchesLoading(true);
        try {
            const res = await fetch(`/api/v1/salespitch/${workspaceId}/company/${companyId}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                setSalesPitches(data);
            } else {
                console.log("Something went wrong when fetching sales pitches...");
            }
        } catch (e) {
            console.log(e);
        }
        setIsSalesPitchesLoading(false);
    }

    async function pollSalesPitches() {
        while (isPolling) {
            try {
                const res = await fetch(`/api/v1/salespitch/${workspaceId}/company/${companyId}`);
                if (res.ok) {
                    const data = await res.json();
                    setSalesPitches(data);

                    // Check if all sales pitches are complete
                    const allComplete = data.every(pitch => pitch.isComplete);
                    if (allComplete) {
                        setIsPolling(false);
                        break;
                    }

                    // Wait 1.5 seconds before next poll
                    await new Promise(resolve => setTimeout(resolve, 1500));
                } else {
                    setIsPolling(false);
                    break;
                }
            } catch (e) {
                console.error(e);
                setIsPolling(false);
                break;
            }
        }
    }

    useEffect(() => {
        fetchSalesPitches()
    }, []);

    useEffect(() => {
        setIsPolling(true);
        pollSalesPitches();
    }, [isGeneratingSalesPitchLoading]);

    if (isSalesPitchesLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="animate-pulse flex space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Sales Pitches
                    </h2>

                    {!salesPitches && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No sales pitches yet. Try generating one!
                            </p>
                        </div>
                    )}

                    <div className="space-y-6 flex flex-wrap">
                        {salesPitches?.map((salesPitch) => (
                            <SalesPitchCard
                                key={salesPitch.salesPitchId}
                                salesPitch={salesPitch}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanySalesPitches;