import {BrowserRouter, Route, Routes} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {useEffect, useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";
import {ReRoute} from "./components/ReRoute.tsx";
import {Company} from "./components/Company.tsx";
import {LoadingScreen} from "./app/LoadingScreen.tsx";
import Login from "./app/auth/Login.tsx";
import Register from "./app/auth/Register.tsx";
import {Leads} from "./app/Leads.tsx";
import {AILeadAssist} from "./app/AILeadAssist.tsx";
import {Dashboard} from "./app/Dashboard.tsx";


export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchAccount(){
        try{
            const result = await fetch("/api/v1/auth/account");
            const data = await result.json();
            if(result.ok){
                console.log(data);
            }
        }catch (e) {
            console.log(e)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAccount()
    }, []);


    if(isLoading) return (
        <LoadingScreen/>
    )

    if(!isLoading) return (

        <BrowserRouter>
            <Routes>
                <Route path={""} Component={ReRoute}/>
                <Route path={"/auth/login"} Component={Login}/>
                <Route path={"/auth/register"} Component={Register}/>
                <Route path={"/app"} Component={SelectWorkspace}/>
                <Route path={"/app/workspace/:workspaceId"} Component={Dashboard}/>
                <Route path={"/app/workspace/:workspaceId/company"} Component={CompanyManager}/>
                <Route path={"/app/workspace/:workspaceId/company/:companyId"} Component={Company}/>
                <Route path={"/app/workspace/:workspaceId/leads"} Component={Leads} />
                <Route path={"/app/workspace/:workspaceId/aileadassist"} Component={AILeadAssist}/>
            </Routes>
        </BrowserRouter>
    );
}


export function Home() {

    return <h1>Home</h1>
}

