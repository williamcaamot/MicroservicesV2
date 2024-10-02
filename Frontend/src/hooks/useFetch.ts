import {useEffect, useState} from "react";

export function useFetchGET(url: string) {
    const [isLoading, setIsLoading] = useState<boolean>(true);  // Start as loading
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        (async function() {
            try {
                setIsLoading(true);  // Set loading to true before fetching
                const result = await fetch(url);
                if (result.ok) {
                    const data = await result.json();
                    setData(data);   // Set the fetched data
                } else {
                    setError("Something went wrong");  // Set an error if the request is not successful
                }
            } catch (e) {
                setError(e.message);  // Set an error if the fetch itself fails
            } finally {
                setIsLoading(false);  // Set loading to false when done
            }
        })();
    }, [url]);

    return { data, error, isLoading };
}