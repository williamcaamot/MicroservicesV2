import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.ts";

export function ReRoute() {
    const navigate = useNavigate()
    const {account} = useContext(AppContext);

    useEffect(() => {
        if(!account) navigate("/")
        if(account) navigate("/app")
    }, [account]);




    return <h1>Home page</h1>
}