import Layout from "./Layout.tsx";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {useEffect, useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";
import {ReRoute} from "./ReRoute.tsx";
import {Company} from "./Company.tsx";
import {LoadingScreen} from "./app/LoadingScreen.tsx";
import Login from "./app/auth/Login.tsx";
import Register from "./app/auth/Register.tsx";

function Dashboard() {
    let {workspaceId} = useParams();
    console.log(workspaceId)
    return <Layout>
        <>Dash</>
    </Layout>
}

function Leads() {
    return<Layout>
        <h1>Leads</h1>
    </Layout>
}

function AILeadAssist() {
    return<Layout>
        <h1>AI Lead Assistant</h1>
    </Layout>
}

export default function App() {

    const [workspace, setWorkspace] = useState<Workspace | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    async function fetchAccount(){
        try{
            const result = await fetch("/api/v1/auth/account");
            const data = await result.json();
            if(result.ok){
                console.log(data);
            }
        }catch (e) {

        }
        setTimeout(() => {
            setIsLoading(false)
        },250)
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

