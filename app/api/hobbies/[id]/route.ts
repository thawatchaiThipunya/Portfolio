import { hobbyController } from "@/backend/controller/hobbyController";

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return hobbyController.getById(parseInt(id));
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return hobbyController.update(req, parseInt(id));
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return hobbyController.delete(parseInt(id));
}