import React, { useState, useEffect } from 'react';
import './Chat.scss';
import { useSelector } from 'react-redux';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [messages, setMessages] = useState([])

    
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        if (isOpen) {
            const initialMessage = user?.name
                ? `Hello ${user.name}, how can I assist you today?`
                : 'Hello, please provide your phone number and describe the problem.'
            setMessages([{ text: initialMessage }]);
        }
    }, [isOpen, user])

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleProblemDescriptionChange = (e) => {
        setProblemDescription(e.target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (phoneNumber.trim() && problemDescription.trim()) {
            const userEmail = user?.email ? `Email: ${user.email}\n` : '';
            const messageToSend = `${userEmail} Phone: ${phoneNumber} \n Problem: ${problemDescription}`;
            setMessages([...messages, { text: messageToSend }])
            sendMessageToTelegram(messageToSend)
            setPhoneNumber('')
            setProblemDescription('')
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
            <IoChatbubbleEllipsesOutline className="chat-icon" onClick={toggleChat}/>
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
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="(+994__) __ __ __"
                        />
                        <textarea
                            value={problemDescription}
                            onChange={handleProblemDescriptionChange}
                            placeholder="Describe your problem"
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Chat;
