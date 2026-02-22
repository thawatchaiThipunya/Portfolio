import { contractBackendService } from "../services/contractService";
import { NextResponse } from "next/server";
import { Contract } from "@/app/cms/lib/types";

export const contractController = {
  async getAll() {
    try {
      const data = await contractBackendService.findAll();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async getById(id: number) {
    try {
      const data = await contractBackendService.findById(id);
      if (!data) return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const body: Partial<Contract> = await req.json();
      const data = await contractBackendService.create(body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async update(req: Request, id: number) {
    try {
      const body: Partial<Contract> = await req.json();
      const data = await contractBackendService.update(id, body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async delete(id: number) {
    try {
      await contractBackendService.softDelete(id);
      return NextResponse.json({ message: "ลบสำเร็จ" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};