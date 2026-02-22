import { technicalBackendService } from "../services/technicalService";
import { NextResponse } from "next/server";

export const technicalController = {
  async getAll() {
    try {
      const data = await technicalBackendService.findAll();
      return NextResponse.json(data);
    } catch  {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },

  async getById(id: number) {
    try {
      const data = await technicalBackendService.findById(id);
      if (!data) return NextResponse.json({ error: "Not Found" }, { status: 404 });
      return NextResponse.json(data);
    } catch  {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const body = await req.json();
      const data = await technicalBackendService.create(body);
      return NextResponse.json(data);
    } catch  {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },

  async update(req: Request, id: number) {
    try {
      const body = await req.json();
      const data = await technicalBackendService.update(id, body);
      return NextResponse.json(data);
    } catch  {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },

  async delete(id: number) {
    try {
      await technicalBackendService.softDelete(id);
      return NextResponse.json({ message: "ลบสำเร็จ" });
    } catch  {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
};