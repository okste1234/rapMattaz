import { envVars } from "@/utils/env";
import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL; // Ensure this variable is correctly set in your environment

export async function POST(req: NextRequest) {
  const {
    untrustedData: { inputText, buttonIndex },
  } = await req.json();

  const imgeUrl = `${envVars.hostUrl}/api/images/answer?text=${inputText}&buttonIndex=${buttonIndex}`;
  const postUrl = `${envVars.hostUrl}/api/code`;

  return new NextResponse(
    `<!DOCTYPE html>
        <html>
          <head>
            <title>Let Rap it up</title>
            <meta property="og:title" content="Rap Mattaz" />
            <meta property="og:image" content="${imgeUrl}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imgeUrl}" />

            <meta property="fc:frame:button:1" content="RapMAttaz" />
            <meta property="fc:frame:post_url" content="${postUrl}" />
            <meta name="fc:frame:button:1:action" content="post_redirect" />
          </head>
          <body/>
        </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export const GET = POST;
