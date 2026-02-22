import { mainProfileController } from './../../../backend/controller/mainProfileController';

export async function GET() {
  return mainProfileController.get();
}

export async function PATCH(req: Request) {
  return mainProfileController.update(req);
}