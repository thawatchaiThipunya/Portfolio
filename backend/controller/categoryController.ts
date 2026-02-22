import { categoryBackendService } from "../services/categoryService";
import { NextResponse } from "next/server";

export const categoryController = {
  async getAll() {
    try {
      const data = await categoryBackendService.findAll();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async getById(id: number) {
    try {
      const data = await categoryBackendService.findById(id);
      if (!data) return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const { name } = await req.json();
      if (!name) return NextResponse.json({ error: "กรุณาระบุชื่อ Category" }, { status: 422 });
      const data = await categoryBackendService.create(name);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async update(req: Request, id: number) {
    try {
      const { name } = await req.json();
      const data = await categoryBackendService.update(id, name);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async delete(id: number) {
    try {
      await categoryBackendService.softDelete(id);
      return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};