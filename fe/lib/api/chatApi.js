import axiosClient from "./axiosClient";

export const chatApi = {
    getContacts: () => axiosClient.get("/chat/contacts"),
    getMessages: (chatId = null) => {
        const url = chatId ? `/chat/messages/${chatId}` : "/chat/messages";
        return axiosClient.get(url);
    },
    sendMessage: (data) => axiosClient.post("/chat/send", data),
};
