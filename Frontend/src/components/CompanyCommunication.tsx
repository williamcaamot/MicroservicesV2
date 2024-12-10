import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorMessage from "./common/ErrorMessage.tsx";


interface CommunicationMessage{
    communicationId?: number,
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


    const [activeSender, setActiveSender] = useState<"me" | "them">("me");
    const [activeMessage, setActiveMessage] = useState<String | undefined>("");

    const [messages, setMessages] = useState<CommunicationMessage[]>([])


    async function fetchCompanyCommunication(){
        setIsLoading(true)
        try{
            const res = await fetch(`/api/v1/communication/${workspaceId}/company/${companyId}`)
            const data = await res.json() as CommunicationMessage[];
            console.log(data)
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


    useEffect(() => {
        fetchCompanyCommunication()
    }, []);


    return (
        <div className="bg-white rounded-lg shadow-lg border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Company Communication
            </h2>
            <div className="w-full max-w-2xl mx-auto">

                {error && <ErrorMessage message={error} onClose={() => setError(undefined)}/>}

                {/* Message Container */}
                <div className="bg-gray-50 rounded-lg shadow-md">
                    {/* Messages Area - Scrollable */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages && messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        message.sender === 'me'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
                        <div className="flex space-x-2">
                            <select
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setActiveMessage(event.target.value)}
                            >
                                <option value="US">ME</option>
                                <option value="THEM">THEM</option>
                            </select>
                            <input
                                value={activeMessage}
                                onChange={(event) => setActiveMessage(event.target.value)}
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={handleSaveCommunicationMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}