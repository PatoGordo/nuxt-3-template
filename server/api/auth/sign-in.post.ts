// Roles
/* 
  0 - Useless
  1 - Admin
  2 - Editor
  3 - User
*/

// Status
/* 
  0 - Deleted
  1 - Approved
  2 - Analysis
*/

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prismaClient } from "~~/server/db-client";
import { validateForm } from "js-laravel-validation";
import moment from "moment";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const validation = validateForm({
    formData: {
      email: {
        value: email,
        validation: "required|email",
      },
      password: {
        value: password,
        validation: "required|min:6",
      },
    },
    includeMessages: false,
  });

  if (validation.errors) {
    console.log(validation.errors);

    return {
      message: "Check if all form fields are filled!",
      errors: validation.errors,
    };
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if ([0, 2].includes(user?.status || 0)) {
    event.node.res.statusCode = 403;

    return {
      message:
        "Probabily your user has been deleted or unactive, contact the admin to solve that.",
    };
  }

  if (!user) {
    event.node.res.statusCode = 403;

    return {
      message: "Email or password went wrong!",
    };
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return {
      user,
      message: "You has been logged-in with success!",
      token,
      expires_at: moment().add(24, "h"),
    };
  } else {
    event.node.res.statusCode = 403;

    return {
      message: "Email or password went wrong!",
    };
  }
});
