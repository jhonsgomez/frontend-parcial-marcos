"use client";

import { Send, Image as ImageIcon, FileText, X } from "lucide-react";
import { createMessage, updateUserStatus } from "@/utils/api-chat";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function MessageForm({ onMessageSent }) {
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const imageInputRef = useRef(null);
    const pdfInputRef = useRef(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const username = localStorage.getItem("chatUsername");

        if (!username) {
            router.push("/");
            return;
        }

        try {
            // Check if there's content, image, or PDF
            if (content.trim() || imageFile || pdfFile) {
                await updateUserStatus(username, true);
                await createMessage(username, content, imageFile, pdfFile);

                // Reset form
                setContent("");
                setImageFile(null);
                setPdfFile(null);

                // Reset file inputs
                if (imageInputRef.current) imageInputRef.current.value = "";
                if (pdfInputRef.current) pdfInputRef.current.value = "";

                onMessageSent();
            }
        } catch (error) {
            console.log("Error enviando mensaje", error);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    return (
        <div className="bg-white p-4 border-t">
            <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    placeholder="Escribe un mensaje..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

                <div className="flex items-center space-x-2">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
                    >
                        <Send />
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <button
                        type="button"
                        onClick={() => imageInputRef.current.click()}
                        className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-lg hover:bg-green-200"
                    >
                        <ImageIcon size={20} />
                    </button>

                    <input
                        type="file"
                        accept=".pdf"
                        ref={pdfInputRef}
                        onChange={handlePdfUpload}
                        className="hidden"
                        id="pdf-upload"
                    />
                    <button
                        type="button"
                        onClick={() => pdfInputRef.current.click()}
                        className="flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200"
                    >
                        <FileText size={20} />
                    </button>
                </div>
                {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
                {pdfFile && <span className="text-sm text-gray-600">{pdfFile.name}</span>}
            </form>
        </div>
    );
}