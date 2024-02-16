import { NextRequest, NextResponse } from "next/server";
import Profile from "@/app/models/Profile";
import connect from "@/app/lib/db";

export async function GET(req: NextRequest, context: any) {
  try {
    const { params } = context;

    await connect();

    const profile = await Profile.findById(params.id);

    console.log(profile);

    return NextResponse.json(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return NextResponse.json(JSON.stringify({ error }), { status: 401 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { params } = context;
    const body = await req.json();

    await connect();

    const profile = await Profile.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return new NextResponse(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { params } = context;

    await connect();

    const user = await Profile.findByIdAndDelete(params.id);

    return new NextResponse(
      JSON.stringify({ message: "User Deleted Successfully", data: user }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
