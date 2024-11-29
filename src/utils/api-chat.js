import axios from 'axios';

const API_URL = process.env.API_URL;

export async function getMessages() {
    try {
        const response = await axios.get(API_URL + "messages/");
        return response.data
    } catch (error) {
        console.log("Error obteniendo mensajes", error);
    }
}

export const createMessage = async (username, content, imageFile = null, pdfFile = null) => {
    try {
        const formData = new FormData();
        formData.append('username', username);

        if (content) {
            formData.append('content', content);
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (pdfFile) {
            formData.append('pdf_file', pdfFile);
        }

        const response = await axios.post(`${API_URL}messages/create/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error creating message:', error);
    }
};

export const deleteMessage = async (username, messageId) => {
    try {
        const response = await axios.delete(`${API_URL}messages/${messageId}/delete/`, {
            data: { username }
        });
        return response.data;
    } catch (error) {
        console.log('Error deleting message:', error);
    }
};

export const createAuthor = async (username) => {
    try {
        const response = await axios.post(`${API_URL}authors/create/`, { username: username });
        return response.data;
    } catch (error) {
        console.log('Error creating autor:', error);
    }
}

export const updateUserStatus = async (username, isOnline) => {
    try {
        const response = await axios.post(`${API_URL}authors/${username}/status/`, { is_online: isOnline });
        return response.data;
    } catch (error) {
        console.log('Error updating user status:', error);
    }
};

export async function updateProfilePucture(formData, username) {
    try {
        const author = await getAuthorByUsername(username)
        const response = axios.put(API_URL + "authors/" + author?.id + "/profile_picture/", formData)
        return response
    } catch (error) {
        console.log("Error al actualizar el perfil", error);
    }
}

export async function getAuthorByUsername(username) {
    try {
        const response = await axios.get(API_URL + `authors/${username}/`);
        return response.data
    } catch (error) {
        console.log("Error obteniendo el autor", error);
    }
}