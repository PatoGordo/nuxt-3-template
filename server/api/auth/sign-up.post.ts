import { SignUpController } from "../../app/useCases/Auth/SignUp/SignUp.controller";
import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { SignUpUseCase } from "../../app/useCases/Auth/SignUp/SignUp.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new SignUpUseCase(repository);
  const controller = new SignUpController(useCase);

  return await controller.execute(event);
});
