
import satori from "satori";
import { join } from "path";
import * as fs from "fs";
import sharp from "sharp";
import { envVars } from "../env";

const font = fs.readFileSync(
    join(process.cwd(), "src/fonts/RedHatDisplayBlack.ttf")
);

const generateFrameImageSvg = async (
): Promise<string> => {
    return await satori(
        <div
            style={{
                background: "rgba(13, 13, 15, 0.99)",
                backgroundImage: `url(${envVars.hostUrl}/bgCover.jpeg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                display: "flex",
                flexDirection: "column",
                padding: "3.5rem",
                width: "100%",
                height: "100%",
                alignContent: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <span
                    style={{
                        fontSize: "18px",
                        lineHeight: "23.81px",
                        fontWeight: "900",
                        color: "rgba(255, 255, 255, 1)",
                        textShadow:
                            "0 0 5px #13547a, 0 0 10px #13547a, 0 0 5px #13547a, 0 0 5px #13547a",
                    }}
                >
                    Rap Mattaz
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4rem",
                    width: "100%",
                    paddingBottom: "40px",
                    animation: "tilt 3s ease-in-out infinite"
                }}
            >
                <img
                    src={`${envVars.hostUrl}/fanNFT.png`}
                    style={{ width: "220px", height: "210px" }}
                />
            </div>
            <div
                style={{
                    fontSize: "14px",
                    position: "absolute",
                    color: "rgba(255, 255, 255, 1)",
                    bottom: "40px",
                    right: "20px",
                }}
            >
                {new Date().toISOString()}
            </div>
        </div>,
        {
            width: 600,
            height: 400,
            fonts: [
                {
                    data: font,
                    name: "Red Hat Display Black",
                    style: "normal",
                },
            ],
        }
    );
};

export const generateHomeImage = async (

) => {
    const svg = await generateFrameImageSvg();
    return (await sharp(Buffer.from(svg)).toFormat("png").toBuffer()).toString(
        "base64"
    );
};
