import { hobbyBackendService } from "../services/hobbyService";
import { NextResponse } from "next/server";
import { Hobby } from "@/app/cms/lib/types";

export const hobbyController = {
  async getAll() {
    try {
      const data = await hobbyBackendService.findAll();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async getById(id: number) {
    try {
      const data = await hobbyBackendService.findById(id);
      if (!data) return NextResponse.json({ error: "ไม่พบข้อมูลงานอดิเรก" }, { status: 404 });
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const body: Partial<Hobby> = await req.json();
      const data = await hobbyBackendService.create(body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async update(req: Request, id: number) {
    try {
      const body: Partial<Hobby> = await req.json();
      const data = await hobbyBackendService.update(id, body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async delete(id: number) {
    try {
      await hobbyBackendService.softDelete(id);
      return NextResponse.json({ message: "ลบสำเร็จ" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};