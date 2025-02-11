"use server";

import prisma from "@/utils/client";
import { LoginValidation } from "@/utils/UserValidation";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    console.log("inside");
    if (req.method === "POST") {
      const { email, password } = await req.json();
      const fields = { email, password };
      const validation = LoginValidation.safeParse(fields);
      const user = await prisma.user.findUnique({
        where: { email: fields.email as string },
      });
      if (!user) {
        return NextResponse.json(
          { error: "User does not exists." },
          { status: 400 }
        );
      }
      const passwordMatch = await bcryptjs.compare(
        fields.password as string,
        user.password
      );

      if (!passwordMatch) {
        {
          return NextResponse.json(
            { error: "Invalid credentials." },
            { status: 400 }
          );
        }
      }
      return NextResponse.json(
        { success: "User logged in successfully." },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while logging in. Please try again.",
      },
      { status: 500 }
    );
  }
}
