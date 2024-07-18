import satori from "satori";
import { join } from "path";
import * as fs from "fs";
import sharp from "sharp";
import { envVars } from "../env";

const font = fs.readFileSync(
    join(process.cwd(), "src/fonts/RedHatDisplayBlack.ttf")
);

const generateImageSvg = async (artist1: string, artist2: string): Promise<string> => {
    return await satori(
        <div
            style={{
                background: "rgba(13, 13, 15, 0.99)",
                backgroundImage: `url(${envVars.hostUrl}/background.png)`,
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
                        fontSize: "24px",
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
                    gap: "2.9rem",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "40px",
                    paddingTop: "12px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <img
                        src={`${envVars.hostUrl}/Ravel1.jpg`}
                        style={{ width: "220px", height: "220px", borderRadius: "10px" }}
                    />
                    <span
                        style={{
                            fontSize: "20px",
                            lineHeight: "21.81px",
                            fontWeight: "700",
                            color: "rgba(255, 255, 255, 1)",
                            textShadow:
                                "0 0 5px #13547a, 0 0 10px #13547a, 0 0 5px #13547a, 0 0 5px #13547a",
                            position: "absolute",
                            top: "50%",
                            left: "93%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        {artist1}
                    </span>
                </div>
                <div
                    style={{
                        fontSize: "18px",
                        lineHeight: "23.81px",
                        fontWeight: "700",
                        color: "rgb(253, 90, 218)",
                        textShadow:
                            "0 0 5px #13547a, 0 0 10px #13547a, 0 0 5px #13547a, 0 0 5px #13547a",
                    }}
                >
                    VS
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <img
                        src={`${envVars.hostUrl}/Ravel1.jpg`}
                        style={{ width: "220px", height: "220px", borderRadius: "10px" }}
                    />
                    <span
                        style={{
                            fontSize: "20px",
                            lineHeight: "21.81px",
                            fontWeight: "700",
                            color: "rgba(255, 255, 255, 1)",
                            textShadow:
                                "0 0 5px #13547a, 0 0 10px #13547a, 0 0 5px #13547a, 0 0 5px #13547a",
                            position: "absolute",
                            top: "50%",
                            left: "85%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            width: "100%",                           
                        }}
                    >
                        {artist2}
                    </span>
                </div>
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

export const generateBase64Image = async (artist1: string, artist2: string) => {
    const svg = await generateImageSvg(artist1, artist2);
    return (await sharp(Buffer.from(svg)).toFormat("png").toBuffer()).toString(
        "base64"
    );
};
