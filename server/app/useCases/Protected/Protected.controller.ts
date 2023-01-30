import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.middleware";
import { AppError } from "../../domain/types/Error";
import { AppSuccess } from "../../domain/types/Success";
import { H3Event } from "h3";
import { $st } from "~~/server/i18n/$st";

export class ProtectedController {
  async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const { error } = await ensureAuthenticated(event, [1, 2]);

      if (error) {
        throw error;
      }

      return {
        result: {
          message: $st("protected.this_is_a_protected_data_from_the_server"),
        },
      };
    } catch (error) {
      event.node.res.statusCode = 401;

      return {
        message: (error as AppError).message,
      };
    }
  }
}
