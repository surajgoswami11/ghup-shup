import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../helper/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  //
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data?.filterUser || [] });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  //
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      console.log(res, "ths is msg res");
      set({ messages: res.data.messages || [] });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // send message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data?.newMessage] });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
  //
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  //
  unSubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },

  //
  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
}));
