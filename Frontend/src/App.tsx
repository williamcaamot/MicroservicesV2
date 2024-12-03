import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CompanyManager from "./app/CompanyManager";
import {useEffect, useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace";
import {Home} from "./components/Home";
import {Company} from "./components/Company";
import {LoadingScreen} from "./app/LoadingScreen";
import Login from "./app/auth/Login";
import Register from "./app/auth/Register";
import {Leads} from "./app/Leads";
import {AILeadAssist} from "./app/AILeadAssist";
import {Dashboard} from "./app/Dashboard";
import {AppContext} from "./context/AppContext";
import WorkspaceSettings from "./app/WorkspaceSettings";


export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<Account | undefined>(undefined);

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
                    <Route path={""} Component={Home}/>
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
        <Route path={"/workspace/:workspaceId/settings"} Component={WorkspaceSettings}/>
        <Route path={"/workspace/:workspaceId/company"} Component={CompanyManager}/>
        <Route path={"/workspace/:workspaceId/company/:companyId"} Component={Company}/>
        <Route path={"/workspace/:workspaceId/leads"} Component={Leads}/>
        <Route path={"/workspace/:workspaceId/aileadassist"} Component={AILeadAssist}/>
    </Routes>
}