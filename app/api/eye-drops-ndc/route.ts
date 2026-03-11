// app/api/eye-drops-ndc/route.ts
import { NextResponse } from "next/server";
import { getEyeDropNdcData } from "@/lib/fdaNdc";

export const revalidate = 86400;

export async function GET() {
  try {
    const data = await getEyeDropNdcData();
    return NextResponse.json(
      { items: data },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load FDA eye drop data" },
      { status: 500 },
    );
  }
}
