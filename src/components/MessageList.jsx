"use client";

import { Send, User, Image as ImageIcon, FileText, Edit, X, Trash } from "lucide-react";
import Image from "next/image";
import { deleteMessage, getAuthorByUsername, updateUserStatus } from "@/utils/api-chat";
import { useState, useEffect } from "react";
import validator from "validator";

export default function MessageList({ messages, onMessageDeleted }) {
    const [username, setUsername] = useState(typeof window !== "undefined" ? window.localStorage.getItem("chatUsername") : null);

    function isValidURL(string) {
        return validator.isURL(string);
    }


    useEffect(() => {
        let cerrando = false;
        const author = typeof window !== "undefined" ? window.localStorage.getItem("chatUsername") : null;

        const initUserStatus = async () => {
            try {
                // Actualizar estado de usuario
                await updateUserStatus(author, true);

                // Obtener autor
                await Promise.all([
                    getAuthorByUsername(author),
                ]);

                cerrando = true;
            } catch (error) {
                console.error("Error inicializando estado", error);
            }
        };

        initUserStatus();

        return () => {
            if (cerrando) {
                updateUserStatus(author, false);
            }
        }
    }, []);

    const handleDeleteMessage = async (messageId) => {
        try {
            await deleteMessage(username, messageId);
            if (onMessageDeleted) onMessageDeleted();
        } catch (error) {
            console.error("Error eliminando mensaje", error);
        }
    };

    const renderMessageContent = (message) => {
        switch (message.message_type) {
            case 'text':
                return isValidURL(message.content) ? (
                    <a
                        href={message.content}
                        target="_blank"
                        className="text-blue-600 underline hover:text-blue-800 break-words"
                    >
                        {message.content}
                    </a>
                ) : (
                    <span>{message.content}</span>
                );
            case 'image':
                return (
                    <Image
                        src={`http://127.0.0.1:8000${message.image}`}
                        alt="Imagen del chat"
                        className="max-w-64 rounded-lg"
                        width={200}
                        height={100}
                        style={{ objectFit: 'cover' }}
                        unoptimized
                        priority
                        quality={100}
                    />
                );
            case 'pdf':
                return (
                    <a
                        href={`http://127.0.0.1:8000${message.pdf_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <FileText className="mr-2" /> archivo.pdf
                    </a>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {messages?.map((message) => {
                const isOwnMessage = message.author.name === username;
                return (
                    <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} w-full`}
                    >
                        <div
                            className={`flex items-start space-x-3 p-3 rounded-lg max-w-[80%] ${isOwnMessage
                                ? 'bg-green-100 flex-row-reverse space-x-reverse'
                                : 'bg-gray-100'
                                }`}
                        >
                            {(
                                <Image
                                    src={
                                        message.author.profile_picture
                                            ? `http://127.0.0.1:8000${message.author.profile_picture}`
                                            : '/img/no-photo.jpg'
                                    }
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 rounded-full object-cover shrink-0"
                                    priority
                                    quality={100}
                                    unoptimized
                                    alt="Perfil"
                                />
                            )}
                            <div className="flex-grow min-w-0">
                                {!isOwnMessage && (
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold truncate">{message.author.name}</span>
                                        <span className={`h-2 w-2 rounded-full shrink-0 ${message.author.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    </div>
                                )}
                                {isOwnMessage && (
                                    <div className="flex items-center justify-end space">
                                        <button
                                            onClick={() => handleDeleteMessage(message.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash className="mr-1" size={16} />
                                        </button>
                                        <span className="font-bold truncate ">Yo</span>
                                    </div>
                                )}
                                <div className="mt-1 break-words">
                                    {renderMessageContent(message)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}