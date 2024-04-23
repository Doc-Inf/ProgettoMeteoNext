import mysql from "mysql2/promise";

export type WeatherRes = {
  id: number;
  data: string;
  tempOut: number;
  hiTemp: number;
  lowTemp: number;
  outHum: number;
  devPt: number;
  windSpeed: number;
  windDir: string;
  hiSpeed: number;
  hiDir: string;
  chillWind: number;
  heatIndex: number;
  thwIndex: number;
  bar: number;
  rain: number;
  rainRate: number;
  heatDD: number;
  coolDD: number;
  inTemp: number;
  inHum: number;
  inDew: number;
  inHeat: number;
  inEMC: number;
  inAirDensitiy: number;
  windSamp: number;
  windTx: number;
  issRecept: number;
  arcInt: number;
};
const executeQuery = async (query: string) => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "meteo",
    });
    const [result] = await db.execute(query, []);
    await db.end();
    console.log("Connected to MySQL!");
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default executeQuery;
