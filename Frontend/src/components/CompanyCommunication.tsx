import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorMessage from "./common/ErrorMessage.tsx";
import Message from "./common/Message.tsx";


export interface CommunicationMessage{
    messageId?: number,
    companyId?: number,
    workspaceId?: number,
    message?: string,
    sender?: "me" | "them"
    createdAt?: string,
    createdBy?: string,
    updatedAt?: string,
    updatedBy?: string
}


export default function CompanyCommunication(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {companyId, workspaceId} = useParams();
    const [error, setError] = useState<string | undefined>(undefined)
    const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false)


    const [activeSender, setActiveSender] = useState<string>("me");
    const [activeMessage, setActiveMessage] = useState<String | undefined>("");

    const [messages, setMessages] = useState<CommunicationMessage[]>([])


    async function fetchCompanyCommunication(){
        setIsLoading(true)
        try{
            const res = await fetch(`/api/v1/communication/${workspaceId}/company/${companyId}`)
            const data = await res.json() as CommunicationMessage[];
            setMessages(data)
            if(!res.ok){
                setError("Something went wrong! Please try again!")
            }
        }catch (e) {
            console.log(e)
            setError(e.message)
        }
        setIsLoading(false)
    }


    async function handleSaveCommunicationMessage() {
        setIsSavingLoading(true);
        try {
            const res = await fetch(`/api/v1/communication/${workspaceId}/company/${companyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sender: activeSender,
                    message: activeMessage
                })
            });


            if (res.ok) {
                const newMessage = await res.json() as CommunicationMessage;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } else {
                const errorData = await res.json();
                setError(`Failed to send message: ${errorData.message || "Unknown error"}`);
            }
        } catch (e: any) {
            setError("Something went wrong: " + e.message);
        }
        setIsSavingLoading(false);
    }

    async function handleDeleteMessage(messageId: number){
        try {
            const res = await fetch(`/api/v1/communication/${workspaceId}/company/${companyId}/communication/${messageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (res.ok) {
                setMessages((prevMessages) => prevMessages.filter((message) => message.messageId !== messageId));
                alert("Successfully deleted message!")
            } else {
                setError(`Failed to delete message! Try again`);
            }
        } catch (e: any) {
            setError("Something went wrong: " + e.message);
        }
    }


    useEffect(() => {
        fetchCompanyCommunication()
    }, []);


    return (
        <div className="bg-white broder rounded-lg shadow-lg border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Company Communication
            </h2>
            <div className="w-full max-w-4xl mx-auto">

                {error && <ErrorMessage message={error} onClose={() => setError(undefined)}/>}

                {/* Message Container */}
                <div className="bg-gray-50 rounded shadow-md border">
                    {/* Messages Area - Scrollable */}
                    <div className="h-[500px] overflow-y-auto p-4 space-y-4">

                        {messages && messages.length < 1 && <h3 className={"text-2xl text-zinc-800"}>No communication yet! You can write down your communication with this company below to keep track of it!</h3>}
                        {messages && messages.map((message) => (<Message message={message} handleDeleteMessage={handleDeleteMessage}/>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
                        <div className="flex space-x-2">
                            <select
                                className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setActiveSender(event.target.value)}
                            >
                                <option value="me">ME</option>
                                <option value="them">THEM</option>
                            </select>
                            <input
                                value={activeMessage}
                                onChange={(event) => setActiveMessage(event.target.value)}
                                type="text"
                                placeholder="Write a message..."
                                className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-[#1B5A7A] text-white px-4 py-2 hover:bg-[#123c52] transition-colors"
                            onClick={handleSaveCommunicationMessage}
                            >
                                Add Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}