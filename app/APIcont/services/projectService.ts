import axios from "axios";
import { Project } from "@/app/cms/lib/types";

export const projectService = {
  getAll: (): Promise<Project[]> => axios.get("/api/projects").then(res => res.data),
  getById: (id: string): Promise<Project> => axios.get(`/api/projects/${id}`).then(res => res.data),
  create: (data: Partial<Project>): Promise<Project> => axios.post("/api/projects", data).then(res => res.data),
  update: (id: string, data: Partial<Project>): Promise<Project> => axios.patch(`/api/projects/${id}`, data).then(res => res.data),
  delete: (id: number): Promise<{ message: string }> => axios.delete(`/api/projects/${id}`).then(res => res.data),
  reorder: (items: { id: number; sortOrder: number }[]): Promise<void> =>
    axios.patch("/api/projects/reorder", { items }).then(res => res.data),
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  }
};