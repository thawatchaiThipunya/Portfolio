import { projectController } from "@/backend/controller/projectController";

// แก้ไขจุดนี้: ใส่ async และใช้ Promise สำหรับ params
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // ต้อง await ก่อน
  const id = Number(resolvedParams.id);
  
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  return projectController.getById(id);
}

// PATCH และ DELETE ก็ต้องแก้เหมือนกันครับ
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  return projectController.update(req, id);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  return projectController.delete(id);
}