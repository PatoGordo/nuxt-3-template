import { ensureAuthenticated } from "../handlers/ensureAuthenticated";

export default defineEventHandler(async (event) => {
  const { error } = await ensureAuthenticated(event, [1, 2]);

  if (error) {
    return error;
  }

  return {
    result:
      "This is a protected content! (Verified at Server side and Client side)",
  };
});
