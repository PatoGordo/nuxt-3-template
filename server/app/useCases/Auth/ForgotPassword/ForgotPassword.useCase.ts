import { IAuthRepository } from "~~/server/app/repositories/Interfaces/IAuthRepository";

export class ForgotPasswordUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute({
    email,
  }: {
    email: string;
  }): Promise<{ recoverToken: string }> {
    try {
      const result = await this.repository.forgotPassword({ email });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
