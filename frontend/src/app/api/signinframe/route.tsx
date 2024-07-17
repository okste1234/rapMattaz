
import { envVars } from "@/utils/env";
import { generateHomeImage } from "@/utils/images/imageFrameHome";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
    try {

        const base64Image = await generateHomeImage();  

        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Rap Mattaz Farcaster Frame</title>
              <meta property="og:title" content="Rap Mattaz Farcaster Frame" />
              <meta
                property="og:image"
                content=${envVars.hostUrl}/RapMattaz.png
              />
              <meta property="fc:frame" content="vNext" />
              <meta
                property="fc:frame:image"
                content="data:image/png;base64,${base64Image}"
              />
              <meta property="fc:frame:button:1" content="sign in" />
              <meta name="fc:frame:button:1:action" content="link" />
              <meta name="fc:frame:button:1:target" content=${envVars.hostUrl}/signin />
            </head>
            <body>
              <p>"Rap Mattaz Farcaster Frame</p>
            </body>
          </html>
    `);
    } catch (error) {
        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Rap Mattaz Farcaster Frame</title>
              <meta property="og:title" content="Rap Mattaz Farcaster Frame" />
              <meta
                property="og:image"
                content=${envVars.hostUrl}/error.png
              />
              <meta property="fc:frame" content="vNext" />
              <meta
                property="fc:frame:image"
                content=${envVars.hostUrl}/error.png
              />
              <meta
                property="fc:frame:post_url"
                content=${envVars.hostUrl}
              />
              <meta property="fc:frame:button:1" content="Reset" />
            </head>
            <body>
              <p>"Rap Mattaz Farcaster Frame</p>
            </body>
          </html>
        `);
    }
}

export async function POST(
    req: NextRequest,
    res: NextResponse
): Promise<Response> {
    return getResponse(req);
}

export const dynamic = "force-dynamic";