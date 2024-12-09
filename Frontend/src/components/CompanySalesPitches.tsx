import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SalesPitchCard, {SalesPitchType} from "./SalesPitchCard.tsx";


export default function CompanySalesPitches({isGeneratingSalesPitchLoading}) {
    const {companyId, workspaceId} = useParams();
    const [isPolling, setIsPolling] = useState<boolean>(false)
    const [salesPitches, setSalesPitches] = useState<SalesPitchType[] | undefined>(undefined)
    const [isSalesPitchesLoading, setIsSalesPitchesLoading] = useState<boolean>(false);


    async function fetchSalesPitches() {
        setIsSalesPitchesLoading(true)
        try {
            const res = await fetch(`/api/v1/salespitch/${workspaceId}/company/${companyId}`)
            if (res.ok) {
                const data = await res.json();
                setSalesPitches(data);
            } else {
                console.log("Something went wrong when fetching sales pitches...");
            }
        } catch (e) {
            console.log(e)
        }
        setIsSalesPitchesLoading(false);
    }


    useEffect(() => {
        fetchSalesPitches();
    }, [isGeneratingSalesPitchLoading]);


    useEffect(() => {

    }, []);


    return <>
        <div className={"w-full"}><h2 className={"text-2xl font-bold p-2"}>Sales pitches for company</h2>
            {!salesPitches && <p>No sales pitches yet.. Try generate one!</p>}

            {
                salesPitches && salesPitches.map((salesPitch: SalesPitchType) => {
                    return <SalesPitchCard salesPitch={salesPitch}/>
                })
            }
        </div>


    </>
}