import { create } from "zustand";
import { axiosInstance } from "../helper/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdatinProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
    } catch (error) {
      toast.error(error.res.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in sucessfully");
    } catch (error) {
      toast.error(error.res.data.message);
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error.res.data.message);
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
      toast.error(error.res.data.message);
    }
  },
}));
