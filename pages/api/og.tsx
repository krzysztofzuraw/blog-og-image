import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const interBlack = fetch(
  new URL("../../assets/Inter-Black.otf", import.meta.url)
).then((res) => res.arrayBuffer());
const interRegular = fetch(
  new URL("../../assets/Inter-Regular.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const interBlackData = await interBlack;
  const interRegularData = await interRegular;

  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#FAFAFA",
            height: "100%",
            width: "100%",
            padding: "64px",
            color: "#333333",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "60%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                letterSpacing: "-0.1rem",
                lineHeight: 1.2,
                fontFamily: "Inter Black",
              }}
            >
              {title}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://krzysztofzuraw.com/avatar.jpg"
                width="100"
                height="100"
                style={{
                  borderRadius: 128,
                }}
                alt=""
              />
              <h2
                style={{
                  marginLeft: "20px",
                  fontSize: "42px",
                  fontFamily: "Inter Regular",
                }}
              >
                Krzysztof Żuraw
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            <svg
              width="300"
              height="300"
              version="1.1"
              viewBox="0 0 700 700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m529.24 428.48h11.211v-201.66h56.055v-67.266h100.76v-111.97h-448.03v-44.844h-156.95v44.844h-56.055v111.97h56.055v470.45h-89.551v67.266h336.05v-67.266h-89.551v-470.45h212.87v67.266h56.055v180.06c-38.008 5.4688-67.266 38.145-67.266 77.656 0 43.203 35.137 78.477 78.477 78.477s78.477-35.137 78.477-78.477h-22.422c0 30.898-25.156 56.055-56.055 56.055s-56.055-25.156-56.055-56.055c-0.13672-31.035 25.02-56.055 55.918-56.055zm-414.53-403.32h111.97v22.422h-111.97zm17.773 134.39-17.773 17.773v-17.773zm94.336 353.83-96.113-96.113 96.113-96.113zm-15.859 15.859-96.113 96.113v-192.36zm-96.25-127.83v-192.36l96.113 96.113zm201.66 251.02v22.422h-291.21v-22.422zm-174.59-22.422 85.039-85.039v85.039zm85.039-340.7-96.113-96.113 33.633-33.633h62.617v129.75zm-168.03-152.17v-67.129h616.05v67.266h-616.05zm425.61 22.422h89.551v44.844h-89.551z" />
                <path d="m338.79 92.285h22.422v22.422h-22.422z" />
                <path d="m383.63 92.285h22.422v22.422h-22.422z" />
                <path d="m293.95 92.285h22.422v22.422h-22.422z" />
              </g>
            </svg>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter Black",
            data: interBlackData,
            style: "normal",
          },
          {
            name: "Inter Regular",
            data: interRegularData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
