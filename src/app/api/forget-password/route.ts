import User from "@/app/models/User";
import connect from "../../lib/db";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { send } from "@/app/lib/mail";

export async function POST(req: NextRequest) {
  try {
    // Get Data from the Body
    const { email } = await req.json();

    // Connecting to the Database
    await connect();

    let user = User.findOne({ email: email });

    if (!user) {
      return new NextResponse(JSON.stringify("Email does not exists"), {
        status: 400,
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordExpiresIn = Date.now() + 6000000;

    await User.updateOne(
      { email: email },
      { resetToken: passwordResetToken, passwordExpiresIn: passwordExpiresIn }
    );

    const resetUrl = `localhost:3000/reset-password/${resetToken}`;

    // sending the user the link to reset the password

    send(resetUrl);

    return new NextResponse(JSON.stringify(resetUrl), { status: 200 });

    // await User.updateOne(
    //   { email: email },
    //   { resetToken: undefined, passwordExpiresIn: undefined }
    // );

    // doesn't work properly for undefined;
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}
