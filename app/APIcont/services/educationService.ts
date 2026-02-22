import axiosInstance from "@/lib/axios";
import { Education } from "@/app/cms/lib/types";

export const educationService = {
  getAll: async () => {
    const { data } = await axiosInstance.get<Education[]>("/education");
    return data;
  },
  getById: async (id: number) => {
    const { data } = await axiosInstance.get<Education>(`/education/${id}`);
    return data;
  },
  create: async (payload: Partial<Education>) => {
    const { data } = await axiosInstance.post("/education", payload);
    return data;
  },
  update: async (id: number, payload: Partial<Education>) => {
    const { data } = await axiosInstance.patch(`/education/${id}`, payload);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/education/${id}`);
    return data;
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data.url; 
  }
};