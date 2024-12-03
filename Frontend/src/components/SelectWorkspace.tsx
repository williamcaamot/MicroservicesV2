import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import InformationPopup from "./common/InformationPopup";
import SignoutButton from "./common/SignoutButton";

export function SelectWorkspace() {
    const [workspaces, setWorkspaces] = useState<Workspace[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined)

    const navigate = useNavigate()


    async function fetchWorkspaces() {
        setIsLoading(true);
        try {
            const result = await fetch("/api/v1/workspace")
            console.log(result)

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
            const result = await fetch("/api/v1/workspace", {
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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Select Workspace </h2><InformationPopup>Create a workspace to use the application. All information is stored in association to a workspace.</InformationPopup>
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="mb-6">
                <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name for new workspace:
                </label>
                <div className="flex gap-2">
                    <input
                        id="workspaceName"
                        value={newWorkspaceName}
                        onChange={(event) => setNewWorkspaceName(event.target.value)}
                        className="flex-grow border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter workspace name"
                    />
                    <button
                        onClick={() => saveNewWorkspace()}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300 ease-in-out"
                    >
                        Save
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaces && workspaces.map((workspace, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/app/workspace/${workspace.workspaceId}`)}
                        className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out"
                    >
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{workspace.name}</h3>
                        <span className="text-sm text-gray-500">ID: {workspace.workspaceId}</span>
                    </div>
                ))}
            </div>
            <SignoutButton/>
        </div>
    );
};