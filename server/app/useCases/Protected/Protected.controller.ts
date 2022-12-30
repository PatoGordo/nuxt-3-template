import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.middleware";
import { AppError } from "../../domain/types/Error";
import { AppSuccess } from "../../domain/types/Success";
import { H3Event } from "h3";

export class ProtectedController {
  async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const { error } = await ensureAuthenticated(event, [1, 2]);

      if (error) {
        throw error;
      }

      return {
        result: {
          message: "This is a protected data from the server!",
        },
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return {
        message: (error as AppError).message,
      };
    }
  }
}
