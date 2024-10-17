// components/Chat.tsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const Chat: React.FC<{ chatRoomId: string }> = ({ chatRoomId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`/api/chat/${chatRoomId}`);
            setMessages(response.data);
        };

        fetchMessages();

        socket.on('chat message', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        socket.emit('chat message', { chatRoomId, message });
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;