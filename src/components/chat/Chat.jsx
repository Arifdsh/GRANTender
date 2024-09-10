import React, { useState, useEffect } from 'react';
import './Chat.scss';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (isOpen) {
            setMessages([{ text: "Hello, how can I help you?" }])
            
        }
    }, [isOpen])

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim()) {
            const newMessage = { text: message }
            setMessages([...messages, newMessage])
            sendMessageToTelegram(message)
            setMessage('')
        }
    }

    const sendMessageToTelegram = async (message) => {
        const chatId = '225661115'
        const botToken = '7399931571:AAEHSCz6u5yN4kuATMy0yj7iJVSHM_fNMHI'
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
    }

   

    return (
        <div className="chat-container">
            <div className="chat-icon" onClick={toggleChat}> </div>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Chat</span>
                        <button onClick={toggleChat}>x</button>
                    </div>
                    <div className="chat-body">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <p key={index}>{msg.text}</p>
                            ))}
                        </div>
                    </div>
                    <form className="chat-input" onSubmit={handleSendMessage}>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type a message..."
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Chat;
