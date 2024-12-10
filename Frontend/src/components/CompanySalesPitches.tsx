import SalesPitchCard, {SalesPitchType} from "./common/SalesPitchCard.tsx";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "./Button.tsx";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

const CompanySalesPitches = () => {
    const {companyId, workspaceId} = useParams();
    const [salesPitches, setSalesPitches] = useState<SalesPitchType[] | undefined>(undefined);
    const [isSalesPitchesLoading, setIsSalesPitchesLoading] = useState(false);
    const [isPolling, setIsPolling] = useState<boolean>(true);
    const [isGeneratingSalesPitch, setIsGeneratingSalesPitch] = useState<boolean>(false)

    const isPollingRef = useRef(false);

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

    useEffect(() => {
        fetchSalesPitches()
    }, []);

    async function handleGenerateSalesPitch() {
        setIsGeneratingSalesPitch(true);
        try {
            const res = await fetch(`/api/v1/workspace/${workspaceId}/company/salespitch`, {
                method: "POST",
                headers: {
                    "content-type": "Application/JSON"
                },
                body: JSON.stringify({
                    companyId: companyId
                })
            });
            setTimeout(() => {
                setIsGeneratingSalesPitch(false);
                const dummyPitch: SalesPitchType = {
                    salesPitchId: Date.now(),
                    companyId: Number(companyId),
                    workspaceId: Number(workspaceId),
                    salesPitch: "",
                    prompt: "",
                    complete: false,
                    createdAt: new Date().toISOString(),
                    createdBy: "System",
                };
                setSalesPitches((prev: SalesPitchType[]) => prev ? [...prev, dummyPitch] : [dummyPitch]);
                setIsPolling(true);
                isPollingRef.current = true;
                alert("Sales pitch is generating! Please wait until it's finished!")
                pollSalesPitches();
            }, 3000)
        } catch (e) {
            setIsGeneratingSalesPitch(false)
            console.log(e)
        }
    }

    async function pollSalesPitches() {
        console.log("Polling sales pitches");
        console.log("Ispolling: " + isPolling)
        console.log("isPolling (ref):", isPollingRef.current);

        const poll = async () => {
            if (!isPollingRef.current) return; // Stop if polling is false

            try {
                const res = await fetch(`/api/v1/salespitch/${workspaceId}/company/${companyId}`);
                if (res.ok) {
                    const data = await res.json();
                    setSalesPitches(data);

                    const allComplete = data.every((pitch) => pitch.complete);
                    console.log("All complete:", allComplete);

                    if (allComplete) {
                        isPollingRef.current = false;
                        return;
                    }
                } else {
                    console.log("Response not OK");
                    isPollingRef.current = false;
                    return;
                }
            } catch (e) {
                console.error(e);
                isPollingRef.current = false;
                return;
            }
            setTimeout(poll, 1500);
        };
        poll();
    }


    if (isSalesPitchesLoading) {
        return (
            <div className="bg-gray-50 p-6">
                <div className="animate-pulse flex space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto py-4">
            <div className="bg-white rounded-lg shadow-lg border p-6">
                <div className={"flex gap-4"}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sales Pitches
                </h2>
                <Button variant={"outlined"} onClick={() => handleGenerateSalesPitch()}
                        loading={isGeneratingSalesPitch}>Generate sales pitch</Button>
                </div>
                {salesPitches?.length < 1 && <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No sales pitches yet. Try generating one!
                    </p>
                </div>}


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
    );
};

export default CompanySalesPitches;