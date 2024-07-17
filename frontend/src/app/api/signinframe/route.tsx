import { envVars } from "@/utils/env";
import { generateBase64Image } from "@/utils/images/imageFrameHome";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
    try {

        const base64PriceImage = await generateBase64Image();

        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Price Feed Farcaster Frame</title>
              <meta property="og:title" content="Price Feed Farcaster Frame" />
              <meta
                property="og:image"
                content=${envVars.hostUrl}/RapMattaz.png
              />
              <meta property="fc:frame" content="vNext" />
              <meta
                property="fc:frame:image"
                content="data:image/png;base64,${base64PriceImage}"
              />
              <meta
                property="fc:frame:post_url"
                content=${envVars.hostUrl}/api/signinframe
              />
              <meta property="fc:frame:button:1" content="Refresh" />
            </head>
            <body>
              <p>"Price Feed Farcaster Frame</p>
            </body>
          </html>
    `);
    } catch (error) {
        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Price Feed Farcaster Frame</title>
              <meta property="og:title" content="Price Feed Farcaster Frame" />
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
              <p>"Price Feed Farcaster Frame</p>
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