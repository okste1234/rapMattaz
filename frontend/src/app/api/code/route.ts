import { envVars } from "@/utils/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    untrustedData: { buttonIndex },
  } = await req.json();

  if (buttonIndex === 1) {
    return NextResponse.redirect(`${envVars.hostUrl}`, { status: 302 });
  }
}
