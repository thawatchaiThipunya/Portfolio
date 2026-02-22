import { NextResponse } from "next/server";
import { hobbyBackendService } from "@/backend/services/hobbyService";

export async function GET() {
  const data = await hobbyBackendService.findAll();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await hobbyBackendService.create(body);
  return NextResponse.json(data);
}