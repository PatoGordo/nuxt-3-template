import { SignInController } from "../../app/controllers/Auth/SignIn.controller";
import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuthRepository";
import { SignInUseCase } from "../../app/useCases/Auth/SignIn.useCase";

export default defineEventHandler(async (event) => {
  const authRepository = new PrismaAuthRepository();
  const signInUseCase = new SignInUseCase(authRepository);
  const signInController = new SignInController(signInUseCase);

  return await signInController.execute(event);
});
