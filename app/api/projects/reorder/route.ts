import { projectBackendService } from "@/backend/services/projectService";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request) {
  try {
    const { items } = await req.json();
    await projectBackendService.reorder(items);
    return NextResponse.json({ message: "OK" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
