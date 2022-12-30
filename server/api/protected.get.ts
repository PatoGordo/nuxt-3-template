import { ProtectedController } from "../app/useCases/Protected/Protected.controller";

export default defineEventHandler(async (event) => {
  const protectedController = new ProtectedController();

  return await protectedController.execute(event);
});
