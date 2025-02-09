"use server";

import prisma from "@/utils/client";
import { UserValidation } from "../../../utils/UserValidation";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log(req.method);
    if (req.method === "POST") {
      const { firstName, lastName, email, password } = await req.json();
      const fields = { firstName, lastName, email, password };
      const validation = UserValidation.safeParse(fields);

      if (!validation.success) {
        console.log(validation.error.flatten().fieldErrors);
        const errors = validation.error.flatten().fieldErrors;
        return NextResponse.json({ error: errors }, { status: 400 });
      }

      //Checks if user already exists
      const user = await prisma.user.findUnique({
        where: {
          email: fields.email as string,
        },
      });

      if (user) {
        return NextResponse.json(
          { error: "User already exists." },
          { status: 400 }
        );
      }

      // hashing password using bcryptjs
      const hashedPassword = await bcryptjs.hash(fields.password as string, 10);

      // Creates user
      const newUser = await prisma.user.create({
        data: {
          firstName: fields.firstName as string,
          lastName: fields.lastName as string,
          email: fields.email as string,
          password: hashedPassword,
        },
      });

      if (newUser) {
        return NextResponse.json(
          { success: "User registered successfully." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "An error occurred while registering user." },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Could not register user. Please try again" },
      { status: 500 }
    );
  }
}
