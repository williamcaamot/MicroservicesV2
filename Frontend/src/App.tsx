import Layout from "./Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";
import {ReRoute} from "./ReRoute.tsx";

export default function App() {

    const [workspace, setWorkspace] = useState<Workspace | undefined>(undefined);

    return (

        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={""} Component={ReRoute}/>
                    <Route path={"/app"} Component={SelectWorkspace}/>
                    <Route path={"/app/workspace/:workspaceId/selskaper"} Component={CompanyManager}/>
                    <Route path={"/app/workspace/:workspaceId/selskaper"} Component={Home}/>
                </Routes>
            </Layout>
        </BrowserRouter>


    );
}


export function Home() {

    return <h1>Home</h1>
}

