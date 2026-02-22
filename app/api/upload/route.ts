import { NextResponse } from "next/server";
import { uploadBackendService } from "@/backend/services/uploadService";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const url = await uploadBackendService.uploadFile(file);
    return NextResponse.json({ url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("❌ FULL_UPLOAD_ERROR_LOG:", error); 
    
    return NextResponse.json({ 
      error: message,
      details: String(error) 
    }, { status: 500 });
  }
}