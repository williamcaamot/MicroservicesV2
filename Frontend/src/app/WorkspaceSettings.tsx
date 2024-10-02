import Layout from "../components/Layout.tsx";
import Input from "../components/Input.tsx";
import InformationPopup from "../components/common/InformationPopup.tsx";
import {useState} from "react";


export default function WorkspaceSettings() {
    const [workspaceName, setWorkspaceName] = useState<string>("");
    const [workspaceProduct, setWorkspaceProduct] = useState<string>("");



    return <Layout>
        <div className={"flex"}>
            <h1 className={"font-bold text-2xl"}>Workspace Settings</h1><InformationPopup><p>Fill out information
            regarding your Workspace. This information is used for generating e-mail messages to businesses you want to
            sell to.</p></InformationPopup>
        </div>


        <div className={"py-4"}>

            <Input placeholder={"Workspace name"}/>
            <Input placeholder={"Product you are selling"}/>

        </div>

    </Layout>


}