import Layout from "../components/Layout.tsx";
import Input from "../components/Input.tsx";
import InformationPopup from "../components/common/InformationPopup.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useFetchGET} from "../hooks/useFetch.ts";
import Button from "../components/Button.tsx";


export default function WorkspaceSettings() {
    const [workspaceName, setWorkspaceName] = useState<string>("");
    const [workspaceProduct, setWorkspaceProduct] = useState<string>("");
    const [workspaceOwner, setWorkspaceOwner] = useState<string>("")

    const {workspaceId} = useParams();

    const {data, error, isLoading} = useFetchGET(`/api/v1/workspace/${workspaceId}`)

    useEffect(() => {
        if (data) {
            setWorkspaceOwner(data.owningAccountId);
            setWorkspaceProduct(data.productDescription);
            setWorkspaceName(data.name);
        }
    }, [data]);

    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)

    async function handleEditWorkspace() {
        setIsLoadingSubmit(true)
        try{
            const result = await fetch("/api/v1/workspace", {
                method: "POST",
                headers: {
                    "content-type": "Application/JSON"
                },
                body: JSON.stringify({
                    name: workspaceName,
                    productDescription: workspaceProduct,
                    workspaceId: workspaceId,
                    owningAccountId: workspaceOwner
                })
            })
            if(result.ok){
                setIsLoadingSubmit(false);
                return
            }else {
                console.log("Something went wrong");
            }
        }catch (e) {
            console.log(e)
        }
        setIsLoadingSubmit(false);
    }


    return <Layout>
        <div className={"flex"}>
            <h1 className={"font-bold text-2xl"}>Workspace Settings</h1><InformationPopup><p>Fill out information
            regarding your Workspace. This information is used for generating e-mail messages to businesses you want to
            sell to.</p></InformationPopup>
        </div>


        <div className={"py-4"}>
            {data && <>
                <Input placeholder={"Workspace name"} value={workspaceName}
                       onChange={setWorkspaceName}/>
                <Input placeholder={"Product you are selling"} value={workspaceProduct}
                       onChange={setWorkspaceProduct}/>
            </>}

        </div>
        <Button onClick={() => handleEditWorkspace()} loading={isLoadingSubmit}>Change workspace</Button>

    </Layout>
}

