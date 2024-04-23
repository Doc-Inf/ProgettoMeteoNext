import executeQuery, { WeatherRes } from "@/lib/db";

export default async function page() {
  const res = await executeQuery(
    `SELECT * FROM y2023 WHERE DATE(data) = "2023-11-16"`
  );
  const data: WeatherRes[] = JSON.parse(JSON.stringify(res));

  return (
    <div className="mt-20">
      {data.map((d) => (
        <div>{JSON.stringify(d, null, 2)}</div>
      ))}
    </div>
  );
}
