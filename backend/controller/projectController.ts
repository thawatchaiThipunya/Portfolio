import { projectBackendService } from "../services/projectService";
import { NextResponse } from "next/server";
import { Project } from "@/app/cms/lib/types";

export const projectController = {
  async getAll() {
    try {
      const data = await projectBackendService.getAll();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async getById(id: number) {
    try {
      const data = await projectBackendService.getById(id);
      if (!data) return NextResponse.json({ error: "Project not found" }, { status: 404 });
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const body: Partial<Project> = await req.json();
      const data = await projectBackendService.create(body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async update(req: Request, id: number) {
    try {
      const body: Partial<Project> = await req.json();
      const data = await projectBackendService.update(id, body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async delete(id: number) {
    try {
      await projectBackendService.delete(id);
      return NextResponse.json({ message: "Deleted" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};