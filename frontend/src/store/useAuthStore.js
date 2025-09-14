import { create } from "zustand";
import { axiosInstance } from "../helper/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdatinProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in sucessfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      set({ isLogin: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });

      toast.success("Logout successfully");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },
  updateUser: async (data) => {
    set({ isUpdatinProfile: true });
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  },
  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("http://localhost:3030", {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    // listen for online user

    socket.on("getOnlineUsers", (userId) => {
      set({ onlineUsers: userId });
    });
  },

  //
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
