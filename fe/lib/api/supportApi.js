"use client";

import axiosClient from "./axiosClient";

const supportApi = {
  // ------------- TICKETS -------------
  getTickets: () => axiosClient.get("/support/tickets"),
  getTicketById: (id) => axiosClient.get(`/support/tickets/${id}`),
  replyTicket: (id, payload) => axiosClient.post(`/support/tickets/${id}/reply`, payload),
  updateTicketStatus: (id, payload) =>
    axiosClient.put(`/support/tickets/${id}/status`, payload),

  // -------- KNOWLEDGE BASE ----------
  getArticles: () => axiosClient.get("/support/knowledge-base"),
  getArticle: (id) => axiosClient.get(`/support/knowledge-base/${id}`),
  createArticle: (payload) => axiosClient.post("/support/knowledge-base", payload),
  updateArticle: (id, payload) => axiosClient.put(`/support/knowledge-base/${id}`, payload),
  deleteArticle: (id) => axiosClient.delete(`/support/knowledge-base/${id}`),

  // ------------- LIVE CHAT ----------
  getChatSessions: () => axiosClient.get("/support/chat/sessions"),
  getChatMessages: (chatId) => axiosClient.get(`/support/chat/${chatId}/messages`),
  sendChatMessage: (chatId, payload) =>
    axiosClient.post(`/support/chat/${chatId}/messages`, payload),
};

export default supportApi;
