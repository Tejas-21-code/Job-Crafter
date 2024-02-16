const bcrypt = require("bcrypt");

import User from "@/app/models/User";
import connect from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get Data from the Body
    const body = await req.json();

    // Connecting to the Database
    await connect();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    body.password = hash;

    const user = new User(body);

    await user.save();

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await connect();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const body = await req.json();

    await connect();

    if (body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(body.password, salt);

      console.log(hash);

      body.password = hash;
    }
    // working and had to change for password

    if (body.password.length > 5) {
      console.log(body);
      const user = await User.findOneAndUpdate(
        { email: body.email },
        { password: body.password, resetToken: "", passwordExpiresIn: "" },
        {
          new: true,
        }
      );
      return new NextResponse(JSON.stringify(user), { status: 201 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
