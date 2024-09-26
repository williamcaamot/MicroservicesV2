import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {useContext, useEffect, useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";
import {ReRoute} from "./components/ReRoute.tsx";
import {Company} from "./components/Company.tsx";
import {LoadingScreen} from "./app/LoadingScreen.tsx";
import Login from "./app/auth/Login.tsx";
import Register from "./app/auth/Register.tsx";
import {Leads} from "./app/Leads.tsx";
import {AILeadAssist} from "./app/AILeadAssist.tsx";
import {Dashboard} from "./app/Dashboard.tsx";
import {AppContext} from "./context/AppContext.ts";


export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<object | undefined>(undefined);

    async function fetchAccount() {
        try {
            const result = await fetch("/api/v1/auth/account");
            const data = await result.json();
            if (result.ok) {
                console.log(data);
                setAccount(data);
            }
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAccount()
    }, []);


    if (isLoading) return (
        <LoadingScreen/>
    )

    if (!isLoading) return (

        <AppContext.Provider value={{account: account, setAccount: setAccount}}>
            <BrowserRouter>
                <Routes>
                    <Route path={""} Component={ReRoute}/>
                    <Route path={"/auth/login"} Component={Login}/>
                    <Route path={"/auth/register"} Component={Register}/>
                    <Route path={"/app/*"} element={account ? <AppRoutes/> : <Navigate to={"/auth/login"}/> }/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

function AppRoutes(){
    return<Routes>
        <Route path={"/"} Component={SelectWorkspace}/>
        <Route path={"/workspace/:workspaceId"} Component={Dashboard}/>
        <Route path={"/workspace/:workspaceId/company"} Component={CompanyManager}/>
        <Route path={"/workspace/:workspaceId/company/:companyId"} Component={Company}/>
        <Route path={"/workspace/:workspaceId/leads"} Component={Leads}/>
        <Route path={"/workspace/:workspaceId/aileadassist"} Component={AILeadAssist}/>
    </Routes>
}