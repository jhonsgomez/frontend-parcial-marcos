"use client";

import { Send, User, Image as ImageIcon, FileText, Edit, X } from "lucide-react";
import { createAuthor } from "@/utils/api-chat";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LobbyChat() {

  const [username, setUsername] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.trim()) {
      localStorage.setItem("chatUsername", username);
      await createAuthor(username);
      router.push("/chat");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Bienvenido al chat</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
          >
            <Send className="mr-2" /> Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
