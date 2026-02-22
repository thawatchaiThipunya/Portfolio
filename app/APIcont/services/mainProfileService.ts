import axios from "axios";
import { MainProfile } from "@/app/cms/lib/types";

export const mainProfileService = {
  async get(): Promise<MainProfile> {
    const res = await axios.get("/api/main-profile");
    return res.data;
  },

  async update(data: Partial<MainProfile>): Promise<MainProfile> {
    const res = await axios.patch("/api/main-profile", data);
    return res.data;
  },

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  }
};