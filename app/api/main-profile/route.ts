import { mainProfileController } from './../../../backend/controller/mainProfileController';

export const dynamic = 'force-dynamic';

export async function GET() {
  return mainProfileController.get();
}

export async function PATCH(req: Request) {
  return mainProfileController.update(req);
}