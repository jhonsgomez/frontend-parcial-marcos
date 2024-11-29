"use client";

import { X } from "lucide-react";
import { updateProfilePucture } from '@/utils/api-chat';
import '@/styles/ProfileEditModal.css';
import { useState } from "react";

export default function ProfileEditModal({ username, onClose, onProfileUpdated }) {
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("profile_picture", profilePicture);

        const response = await updateProfilePucture(formData, username)

        if (response.status === 200) {
            onProfileUpdated();
            onClose();
        } else {
            console.log("Error al actualizar el perfil");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Foto de Perfil:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="flex-grow bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-grow bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
