import crypto from "crypto";
import User from "@/app/models/User";
import connect from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    await connect();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      passwordExpiresIn: { $gt: Date.now() },
    });

    if (!user) {
      await User.findOneAndUpdate(
        { resetToken: hashedToken },
        { passwordExpiresIn: "", resetToken: "" }
      );

      return new NextResponse(JSON.stringify("Invalid Token or has Expired"), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    // error not shown
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
