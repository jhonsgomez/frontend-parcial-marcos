"use client";

import { Image as ImageIcon, Edit } from "lucide-react";
import "@/styles/ChatPage.css";
import MessageForm from "@/components/MessageForm";
import MessageList from "@/components/MessageList";
import ProfileEditModal from "@/components/ProfileEditModal";
import { getAuthorByUsername, getMessages, updateUserStatus } from "@/utils/api-chat";
import { useEffect, useState, useCallback } from "react";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [showProfileModal, setShowProfileModal] = useState(false);

    async function fetchMessages() {
        try {
            const response = await getMessages()
            setMessages(response)
        } catch (error) {
            console.log("Error obteniendo mensajes", error)
        }
    }

    useEffect(() => {
        setUsername(localStorage.getItem("chatUsername"));

        fetchMessages();
        const interval = setInterval(fetchMessages, 1000);
        return () => clearInterval(interval)
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden flex flex-col my-5">
                <div className="bg-green-600 text-white py-4 px-6 flex items-center justify-between">
                    <div className="text-xl font-bold">Chat de {username}</div>
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="hover:bg-green-700 p-2 rounded-full transition"
                    >
                        <Edit className="text-white" />
                    </button>
                </div>

                <div className="flex-grow overflow-hidden">
                    <div className="h-[400px] overflow-y-auto p-4">
                        <MessageList
                            messages={messages}
                            onMessageDeleted={fetchMessages}
                        />
                    </div>
                </div>

                <MessageForm onMessageSent={fetchMessages} />

                {showProfileModal && (
                    <ProfileEditModal
                        username={username}
                        onClose={() => setShowProfileModal(false)}
                        onProfileUpdated={fetchMessages}
                    />
                )}
            </div>
        </div>
    );
}