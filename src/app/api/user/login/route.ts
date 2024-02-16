const bcrypt = require("bcrypt");

import User from "@/app/models/User";
import connect from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connect();

    const user =
      (await User.findOne({ userName: body.userId })) ||
      (await User.findOne({ email: body.userId }));

    if (!user) {
      throw new Error("No User Found");
    }

    // compare password
    if (bcrypt.compareSync(body.password, user.password)) {
      return new NextResponse(JSON.stringify(user), { status: 201 });
    }

    throw new Error("Wrong Password or Username");
  } catch (error) {
    console.log(error);
    // error not shown
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
