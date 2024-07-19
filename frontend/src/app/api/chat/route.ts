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
            <meta property="og:image" content=${imgeUrl} />
            <meta property="fc:frame" content="vNext" />
              <meta
                property="fc:frame:image"
                content=${imgeUrl}
              />
              <meta
                property="fc:frame:button:1:post_url"
                content=${envVars.hostUrl}
              />
              <meta property="fc:frame:button:1" content="Refresh" />

              <meta name="fc:frame:button:2" content="RapMattaz" />
              <meta name="fc:frame:button:2:action" content="link" />
              <meta name="fc:frame:button:2:target" content=${envVars.hostUrl} />
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
