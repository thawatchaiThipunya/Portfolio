import { categoryController } from "@/backend/controller/categoryController";

type Params = Promise<{ id: string }>;

// ดึงรายตัว
export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return categoryController.getById(parseInt(id));
}

// แก้ไข
export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return categoryController.update(req, parseInt(id));
}

// ลบ (Soft Delete)
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return categoryController.delete(parseInt(id));
}