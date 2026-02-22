import { educationController } from "@/backend/controller/educationController";

type Params = Promise<{ id: string }>;

// ดึงรายบุคคล (GET /api/education/[id])
export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return educationController.getById(parseInt(id));
}

// แก้ไข (PATCH /api/education/[id])
export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return educationController.update(req, parseInt(id));
}

// ลบ (DELETE /api/education/[id])
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return educationController.delete(parseInt(id));
}