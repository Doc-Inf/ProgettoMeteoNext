import executeQuery from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { day } = await req.json();

    const res = await executeQuery(
      `SELECT * FROM y2023 WHERE data BETWEEN DATE_SUB("${day}", INTERVAL 1 MONTH) AND "${day}"`
    );

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
