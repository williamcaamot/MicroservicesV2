import {CommunicationMessage} from "../CompanyCommunication.tsx";


interface MessageProps{
    message: CommunicationMessage,
    handleDeleteMessage: Function
}

export default function Message({message, handleDeleteMessage}: MessageProps){



    return (
        <div
            key={message.messageId}
            className={`flex group items-start gap-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
        >
            {/* Delete button - shown on left for received messages */}
            {message.sender !== 'me' && (
                <button
                    className="group-hover:opacity-100 duration-200 text-gray-400 hover:text-red-500 p-1 rounded"
                    onClick={() => handleDeleteMessage(message.messageId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}

            {/* Message bubble */}
            <div
                className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'me'
                        ? 'bg-[#1f729c] text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
            >
                {message.message}
            </div>

            {/* Delete button - shown on right for sent messages */}
            {message.sender === 'me' && (
                <button
                    className="group-hover:opacity-100duration-200 text-gray-400 hover:text-red-500 p-1 rounded"
                    onClick={() => handleDeleteMessage(message.messageId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}
        </div>
    )

}