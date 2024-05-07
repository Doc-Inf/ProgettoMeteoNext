import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.itisvallauri.net/meteo3//php/datiHome.php",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // revalidate every 5 minutes
        next: { revalidate: 300 },
      }
    );

    const data = await res.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
