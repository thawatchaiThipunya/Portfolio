import axios from "axios";
import { Hobby } from "@/app/cms/lib/types";

export const hobbyService = {
  async getAll(): Promise<Hobby[]> {
    const res = await axios.get("/api/hobbies");
    return res.data;
  },

  async getById(id: number): Promise<Hobby> {
    const res = await axios.get(`/api/hobbies/${id}`);
    return res.data;
  },

  async create(data: Partial<Hobby>): Promise<Hobby> {
    const res = await axios.post("/api/hobbies", data);
    return res.data;
  },

  async update(id: number, data: Partial<Hobby>): Promise<Hobby> {
    const res = await axios.patch(`/api/hobbies/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const res = await axios.delete(`/api/hobbies/${id}`);
    return res.data;
  },

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  },
};