import { SignUpUseCase } from "../../useCases/Auth/SignUp.useCase";
import { H3Event } from "h3";
import { AppError } from "../../domain/types/Error";
import { AppSuccess } from "../../domain/types/Success";
import * as st from "simple-runtypes";

export class SignUpController {
  constructor(private useCase: SignUpUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      const result = await this.useCase.execute(request);

      return {
        result: {
          ...result,
          password: "protected-data",
        },
      };
    } catch (error) {
      return error as AppError;
    }
  }

  private async validations(request: unknown) {
    const validation = st.record({
      name: st.string(),
      email: st.string({
        match:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        trim: true,
      }),
      password: st.string({ minLength: 8, trim: true }),
    });

    const result = st.use(validation, request);

    if (!result.ok) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
