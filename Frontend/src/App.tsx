import Layout from "./Layout.tsx";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import CompanyManager from "./app/CompanyManager.tsx";
import {Component, useEffect, useState} from "react";
import {SelectWorkspace} from "./components/SelectWorkspace.tsx";

export default function App() {

    const [workspace, setWorkspace] = useState<Workspace | undefined>(undefined);

    const {id} = useParams()
    console.log(id)


    return (

        <BrowserRouter>
            <Layout>
                <Routes>
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

