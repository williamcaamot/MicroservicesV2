import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function ReRoute() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/app")
    }, []);

    return <></>
}