import {useEffect, useState} from "react";
import {SalesPitchType} from "./common/SalesPitchCard.tsx";
import ErrorMessage from "./common/ErrorMessage.tsx";
import {useParams} from "react-router-dom";


export default function AllSalesPitches() {
    const {workspaceId} = useParams();
    const [salesPitches, setSalesPitches] = useState<SalesPitchType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();


    async function fetchAllSalesPitches() {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/v1/salespitch/${workspaceId}`)
            if(res.ok){
                const data = await res.json();
                setSalesPitches(data);
            }else {
                setError("Something went wrong when fetching sales pitches! Try again!")
            }

        } catch (e) {
            setError("Something went wrong! " + e.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAllSalesPitches()
    }, []);

    if (error) return <>
        <ErrorMessage message={error} onClose={() => setError(undefined)}/>
    </>

    return <>
        {salesPitches && salesPitches?.map((salesPitch: SalesPitchType) => {
            return <div>

            </div>
        })
        })

    </>


}