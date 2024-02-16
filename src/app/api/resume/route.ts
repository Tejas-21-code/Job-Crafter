import { NextRequest, NextResponse } from "next/server";
import Profile from "@/app/models/Profile";
import connect from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connect();

    const profile = new Profile(body);

    await profile.save();

    console.log(profile);

    return NextResponse.json(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return NextResponse.json(JSON.stringify({ error }), { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connect();

    const profile = await Profile.find();

    return NextResponse.json(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return NextResponse.json(JSON.stringify({ error }), { status: 401 });
  }
}
