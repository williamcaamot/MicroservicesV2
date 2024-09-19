import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function SelectWorkspace() {
    const [workspaces, setWorkspaces] = useState<Workspace[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined)

    const navigate = useNavigate()

    async function fetchWorkspaces() {
        setIsLoading(true);
        try {
            const result = await fetch("http://localhost:8080/api/v1/workspace")

            if (result.ok) {
                const data = await result.json();

                setWorkspaces(data);
            } else {
                setError("Something went wrong when fetching workspaces")
            }
        } catch (e) {
            setError("Something went wrong when fetching workspaces");
            console.log(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchWorkspaces();
    }, []);


    const [newWorkspaceName, setNewWorkspaceName] = useState<string>("")

    async function saveNewWorkspace() {
        try {
            const result = await fetch("http://localhost:8080/api/v1/workspace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: newWorkspaceName})
            })
            const data = await result.json();
            if (result.ok) {
                setWorkspaces([...workspaces, data])
                setNewWorkspaceName("");
            }
        } catch (e) {
            setError("Something went wrong when saving new workspace")
            console.log(e);

        }
    }


    return <>
        <h2>Select workspace from this list</h2>
        <label>Name for workspace: </label><input value={newWorkspaceName} onChange={(event) => {
        setNewWorkspaceName(event.target.value)
    }} className={"border p-2"}/>
        <button onClick={() => saveNewWorkspace()} className={"bg-purple-800 text-white rounded p-2"}>Save new
            workspace
        </button>


        {workspaces && workspaces.map((workspace, index) => {
            return <div onClick={() => navigate(`/app/${workspace.workspaceId}`)}
                        className={"border p-2 m-2 bg-gray-50 cursor-pointer"}
                        key={index}>{workspace.workspaceId} {workspace.name}

            </div>
        })
        }


    </>
}