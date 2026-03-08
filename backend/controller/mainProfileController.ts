import { mainProfileBackendService } from "../services/mainProfileService";
import { NextResponse } from "next/server";

export const mainProfileController = {
  async get() {
    try {
      const data = await mainProfileBackendService.findFirst();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async update(req: Request) {
    try {
      const body = await req.json();
      const data = await mainProfileBackendService.update(body);
      return NextResponse.json(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};