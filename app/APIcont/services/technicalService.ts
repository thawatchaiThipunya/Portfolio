import axios from "axios";
import { Technical } from "@/app/cms/lib/types";

export const technicalService = {
  async getAll(): Promise<Technical[]> {
    const res = await axios.get("/api/technical");
    return res.data;
  },

  async getById(id: number): Promise<Technical> {
    const res = await axios.get(`/api/technical/${id}`);
    return res.data;
  },

  async create(data: Partial<Technical>): Promise<Technical> {
    const res = await axios.post("/api/technical", data);
    return res.data;
  },

  async update(id: number, data: Partial<Technical>): Promise<Technical> {
    const res = await axios.patch(`/api/technical/${id}`, data);
    return res.data;
  },

  async reorder(items: { id: number; sortOrder: number }[]): Promise<void> {
    await axios.patch("/api/technical/reorder", { items });
  },

  async delete(id: number) {
    const res = await axios.delete(`/api/technical/${id}`);
    return res.data;
  },

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  }
};