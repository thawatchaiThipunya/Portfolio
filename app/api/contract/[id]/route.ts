import { contractController } from "@/backend/controller/contractController";

type Params = Promise<{ id: string }>;

// ดึงรายตัว
export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return contractController.getById(parseInt(id));
}

// แก้ไข
export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return contractController.update(req, parseInt(id));
}

// ลบ (Soft Delete)
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return contractController.delete(parseInt(id));
}