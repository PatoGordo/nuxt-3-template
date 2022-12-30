import { SignUpController } from "~~/server/app/controllers/Auth/SignUp.controller";
import { PrismaAuthRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaAuthRepository";
import { SignUpUseCase } from "~~/server/app/useCases/Auth/SignUp.useCase";

export default defineEventHandler(async (event) => {
  const authRepository = new PrismaAuthRepository();
  const signUpUseCase = new SignUpUseCase(authRepository);
  const signUpController = new SignUpController(signUpUseCase);

  return await signUpController.execute(event);
});
