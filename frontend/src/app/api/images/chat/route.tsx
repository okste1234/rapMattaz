import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { envVars } from "@/utils/env";

export async function GET(req: NextRequest) {
    return new ImageResponse(
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
            }}
        >
            <img
                src={`${envVars.hostUrl}/pic.png`}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                    color: "white",
                }}
            >
                <h1
                    style={{
                        fontSize: "4em",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    How to use it
                </h1>
                <p
                    style={{
                        fontSize: "2em",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                >
                   Ask a question
                </p>

                 <p
                    style={{
                        fontSize: "2em",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                >
                   Select our chatbot with the button
                </p>
            </div>
        </div>
    );
}
