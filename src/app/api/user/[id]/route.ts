const bcrypt = require("bcrypt");

import User from "@/app/models/User";
import connect from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, context: any) {
//   try {
//     // have to put request somewhere else
//     const { params } = context;

//     const body = await req.json();

//     await connect();

//     const user = await User.findOne({ userName: body.userName });

//     if (!user) {
//       throw new Error("No User Found");
//     }

//     // compare password
//     if (bcrypt.compareSync(body.password, user.password)) {
//       return new NextResponse(JSON.stringify(user), { status: 201 });
//     }

//     throw new Error("Wrong Password or Username");
//   } catch (error) {
//     console.log(error);
//     // error not shown
//     return new Response(JSON.stringify(error), { status: 401 });
//   }
// }

// Don't need this patch with id created one in user

// export async function PATCH(req: NextRequest, context: any) {
//   try {
//     const { params } = context;
//     const body = await req.json();

//     await connect();

//     if (body.password) {
//       const salt = bcrypt.genSaltSync(10);
//       const hash = bcrypt.hashSync(body.password, salt);

//       body.password = hash;
//     }

//     const user = await User.findByIdAndUpdate(params.id, body, { new: true });

//     return new NextResponse(JSON.stringify(user), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify(error), { status: 401 });
//   }
// }

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { params } = context;

    await connect();

    const user = await User.findByIdAndDelete(params.id);

    return new NextResponse(
      JSON.stringify({ message: "User Deleted Successfully", data: user }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
