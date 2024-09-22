import Layout from "./Layout.tsx";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";
import {ReRoute} from "./ReRoute.tsx";

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

    return (

        <BrowserRouter>
            <Routes>
                <Route path={""} Component={ReRoute}/>
                <Route path={"/app"} Component={SelectWorkspace}/>
                <Route path={"/app/workspace/:workspaceId"} Component={Dashboard}/>
                <Route path={"/app/workspace/:workspaceId/selskaper"} Component={CompanyManager}/>
                <Route path={"/app/workspace/:workspaceId/leads"} Component={Leads} />
                <Route path={"/app/workspace/:workspaceId/aileadassist"} Component={AILeadAssist}/>
            </Routes>
        </BrowserRouter>
    );
}


export function Home() {

    return <h1>Home</h1>
}

