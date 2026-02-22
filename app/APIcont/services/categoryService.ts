import axiosInstance from "@/lib/axios";
import { Category } from "@/app/cms/lib/types";

export const categoryService = {
  getAll: async () => {
    const { data } = await axiosInstance.get<Category[]>("/category");
    return data;
  },
  getById: async (id: number) => {
    const { data } = await axiosInstance.get<Category>(`/category/${id}`);
    return data;
  },
  create: async (name: string) => {
    const { data } = await axiosInstance.post("/category", { name });
    return data;
  },
  update: async (id: number, name: string) => {
    const { data } = await axiosInstance.patch(`/category/${id}`, { name });
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/category/${id}`);
    return data;
  }
};