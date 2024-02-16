import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db";
import Job from "@/app/models/Job";

export async function GET(req: NextRequest, context: any) {
  try {
    const { params } = context;

    await connect();

    const job = await Job.findById(params.id);

    return new NextResponse(JSON.stringify(job), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const body = await req.json();

    const { params } = context;

    await connect();

    const job = await Job.findByIdAndUpdate(params.id, body, { new: true });

    return new NextResponse(JSON.stringify(job), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { params } = context;

    await connect();

    const job = await Job.findByIdAndDelete(params.id);

    return new NextResponse(
      JSON.stringify({ message: "Job Deleted Successfully", data: job }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
}
