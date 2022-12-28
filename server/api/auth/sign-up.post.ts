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
  const { name, email, password } = await readBody(event);

  const validation = validateForm({
    formData: {
      email: {
        value: email,
        validation: "required|email",
      },
      password: {
        value: password,
        validation: "required|min:8",
      },
      name: {
        value: name,
        validation: "required",
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

  try {
    const alreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      event.node.res.statusCode = 403;

      return {
        message: "This email is being used!",
      };
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return {
      user,
      message: "A new user has been successfully created!",
      token,
      expires_at: moment().add(24, "h"),
    };
  } catch (error) {
    event.node.res.statusCode = 403;

    return {
      message: "An unexpected error has occured!",
      error: (error as { message: string }).message,
    };
  }
});
