import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorMessage from "./common/ErrorMessage.tsx";


interface communication{

}


export default function CompanyCommunication(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {companyId, workspaceId} = useParams();
    const [error, setError] = useState<string | undefined>(undefined)

    async function fetchCompanyCommunication(){
        setIsLoading(true)
        try{
            const res = await fetch(`/api/v1/communication/${workspaceId}/company/${companyId}`)
            const data = await res.json();
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

    useEffect(() => {
        fetchCompanyCommunication()
    }, []);



    const [messages] = useState([
        { id: 1, text: "Hey, how are you?", sender: "them" },
        { id: 2, text: "I'm doing great! Thanks for asking.", sender: "me" },
        { id: 3, text: "Have you seen the latest updates?", sender: "them" },
        { id: 4, text: "Yes, they look amazing! I'm really excited about the new features they've added.", sender: "me" },
        { id: 5, text: "Would you like to discuss them over coffee?", sender: "them" }
    ]);



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
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}