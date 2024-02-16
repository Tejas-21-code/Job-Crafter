import { NextRequest, NextResponse } from "next/server";
import Job from "@/app/models/Job";
import connect from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connect();

    const job = new Job(body);

    await job.save();
    return new NextResponse(JSON.stringify(job), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connect();

    const job = await Job.find();

    return new NextResponse(JSON.stringify(job), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}
