"use client";
import HeroHeading from "@/components/headings/hero-heading";
import HeroWeek from "@/components/hero/hero-week-temp";
import HeroOverview from "@/components/hero/hero-overview";
import HeroGraphs from "@/components/hero/hero-graphs";
import AnimationWrapper from "@/components/ui/anim-wrapper";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // State to store fetched data
  const [datiUltimaRilevazione, setDatiUltimaRilevazione] = useState(null);
  const [temperaturaUltimaRilevazione, setTemperaturaUltimaRilevazione] =
    useState(-1);
  const [umiditaUltimaRilevazione, setUmiditaUltimaRilevazione] = useState(-1);
  const [direzioneVentoUltimaRilevazione, setDirezioneVentoUltimaRilevazione] =
    useState(-1);
  const [pressioneUltimaRilevazione, setPressioneUltimaRilevazione] =
    useState(-1);
  const [
    temperaturaGiornoPrimaUltimaRilevazione,
    setTemperaturaGiornoPrimaUltimaRilevazione,
  ] = useState(-1);
  const [
    umiditaGiornoPrimaUltimaRilevazione,
    setUmiditaGiornoPrimaUltimaRilevazione,
  ] = useState(-1);
  const [
    direzioneVentoGiornoPrimaUltimaRilevazione,
    setDirezioneVentoGiornoPrimaUltimaRilevazione,
  ] = useState(-1);
  const [
    pressioneGiornoPrimaUltimaRilevazione,
    setPressioneGiornoPrimaUltimaRilevazione,
  ] = useState(-1);
  const [
    variazioneTemperaturaUltimoGiornoMisurazione,
    setVariazioneTemperaturaUltimoGiornoMisurazione,
  ] = useState("");
  const [
    variazioneUmiditaUltimoGiornoMisurazione,
    setVariazioneUmiditaUltimoGiornoMisurazione,
  ] = useState("");
  const [
    variazionePressioneUltimoGiornoMisurazione,
    setVariazionePressioneUltimoGiornoMisurazione,
  ] = useState("");
  const [giorniSettimanaCorrente, setGiorniSettimanaCorrente] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [giorniGrafico, setGiorniGrafico] = useState([
    "01/01",
    "02/01",
    "03/01",
    "04/01",
    "05/01",
    "06/01",
    "07/01",
  ]);
  const [mesiUltimaSettimana, setMesiUltimaSettimana] = useState([
    "GEN",
    "GEN",
    "GEN",
    "GEN",
    "GEN",
    "GEN",
    "GEN",
  ]);
  const [temperaturaSettimanale, setTemperaturaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [umiditaSettimanale, setUmiditaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [pressioneSettimanale, setPressioneSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [precipitazioniSettimanali, setPrecipitazioniSettimanali] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [maxTemperaturaSettimanale, setMaxTemperaturaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [minTemperaturaSettimanale, setMinTemperaturaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [maxUmiditaSettimanale, setMaxUmiditaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [minUmiditaSettimanale, setMinUmiditaSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [maxPressioneSettimanale, setMaxPressioneSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [minPressioneSettimanale, setMinPressioneSettimanale] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  // Function to fetch data
  const fetchData = async () => {
    try {
      // Make a GET request using the Fetch API
      const response = await fetch(
        "http://localhost:80/TestMeteo3/php/datiHome.php"
      );
      //const response = await fetch('https://www.itisvallauri.net/meteo3//php/datiHome.php');

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log(
          "OK abbiamo preso i dati, o almeno così sembra dalla risposta"
        );
      }

      // Parse the JSON data from the response
      let json = await response.json();
      console.log(json);
      // Update the state with the fetched data
      setDatiUltimaRilevazione(json);
      console.log(datiUltimaRilevazione);

      const ultimaRilevazione = json["ultimaRilevazione"];
      const rilevazioneGiornoPrimaUltima = json["rilevazioneGiornoPrimaUltima"];
      const giorniSettimanaCorrente = json["giorniSettimanaCorrente"];
      const temperaturaSettimanale = json["temperaturaSettimanale"];
      const umiditaSettimanale = json["umiditaSettimanale"];
      const pressioneSettimanale = json["pressioneSettimanale"];
      const pioggiaSettimanale = json["pioggiaSettimanale"];
      const maxTemperaturaSettimanale = json["maxTemperaturaSettimanale"];
      const minTemperaturaSettimanale = json["minTemperaturaSettimanale"];
      const maxUmiditaSettimanale = json["maxUmiditaSettimanale"];
      const minUmiditaSettimanale = json["minUmiditaSettimanale"];
      const maxPressioneSettimanale = json["maxPressioneSettimanale"];
      const minPressioneSettimanale = json["minPressioneSettimanale"];

      let nullToZero = (array: Array<number>) => {
        for (let i = 0; i < array.length; ++i) {
          if (array[i] == null) {
            array[i] = 0;
          } else {
            array[i] = Number(("" + array[i]).replace(",", ""));
          }
        }
        return array;
      };

      console.log(
        "Giorni della settimana corrente: " + giorniSettimanaCorrente
      );
      console.log(
        "Temperature Settimanali: " + nullToZero(temperaturaSettimanale)
      );
      console.log("Umidità Settimanale: " + nullToZero(umiditaSettimanale));
      console.log("Pressione Settimanale: " + nullToZero(pressioneSettimanale));
      console.log("Pioggia Settimanale: " + nullToZero(pioggiaSettimanale));

      const gxg: string[] = []; // array temporaneo per i giorni del grafico
      const extractGiorni = (giorni: string[], array: string[]) => {
        for (let i = 0; i < giorni.length; ++i) {
          const d = ("" + giorni[i]).split("-");
          array.push(d[2] + "/" + d[1]);
        }
        return array;
      };

      setGiorniSettimanaCorrente(giorniSettimanaCorrente);
      setGiorniGrafico(extractGiorni(giorniSettimanaCorrente, gxg));
      setTemperaturaSettimanale(nullToZero(temperaturaSettimanale));
      setUmiditaSettimanale(nullToZero(umiditaSettimanale));
      setPressioneSettimanale(nullToZero(pressioneSettimanale));
      setPrecipitazioniSettimanali(nullToZero(pioggiaSettimanale));
      setMaxTemperaturaSettimanale(nullToZero(maxTemperaturaSettimanale));
      setMinTemperaturaSettimanale(nullToZero(minTemperaturaSettimanale));
      setMaxUmiditaSettimanale(nullToZero(maxUmiditaSettimanale));
      setMinUmiditaSettimanale(nullToZero(minUmiditaSettimanale));
      setMaxPressioneSettimanale(nullToZero(maxPressioneSettimanale));
      setMinPressioneSettimanale(nullToZero(minPressioneSettimanale));

      setTemperaturaUltimaRilevazione(
        ultimaRilevazione["temperaturaUltimaRilevazione"]
      );
      setUmiditaUltimaRilevazione(
        ultimaRilevazione["umiditaUltimaRilevazione"]
      );
      setDirezioneVentoUltimaRilevazione(
        ultimaRilevazione["direzioneVentoUltimaRilevazione"]
      );
      setPressioneUltimaRilevazione(
        ultimaRilevazione["pressioneUltimaRilevazione"]
      );

      setTemperaturaGiornoPrimaUltimaRilevazione(
        rilevazioneGiornoPrimaUltima["temperaturaUltimaRilevazione"]
      );
      setUmiditaGiornoPrimaUltimaRilevazione(
        rilevazioneGiornoPrimaUltima["umiditaUltimaRilevazione"]
      );
      setDirezioneVentoGiornoPrimaUltimaRilevazione(
        rilevazioneGiornoPrimaUltima["direzioneVentoUltimaRilevazione"]
      );
      setPressioneGiornoPrimaUltimaRilevazione(
        rilevazioneGiornoPrimaUltima["pressioneUltimaRilevazione"]
      );

      if (
        ultimaRilevazione["temperaturaUltimaRilevazione"] != null &&
        rilevazioneGiornoPrimaUltima["temperaturaUltimaRilevazione"] != null
      ) {
        const deltaTemperatura: number = Number(
          (
            ((ultimaRilevazione["temperaturaUltimaRilevazione"] -
              rilevazioneGiornoPrimaUltima["temperaturaUltimaRilevazione"]) /
              rilevazioneGiornoPrimaUltima["temperaturaUltimaRilevazione"]) *
            100
          ).toFixed(2)
        );
        if (deltaTemperatura > 0) {
          setVariazioneTemperaturaUltimoGiornoMisurazione(
            "+" + deltaTemperatura + "% rispetto a ieri"
          );
        } else {
          setVariazioneTemperaturaUltimoGiornoMisurazione(
            "" + deltaTemperatura + "% rispetto a di ieri"
          );
        }
      } else {
        setVariazioneTemperaturaUltimoGiornoMisurazione("");
      }

      if (
        ultimaRilevazione["umiditaUltimaRilevazione"] != null &&
        rilevazioneGiornoPrimaUltima["umiditaUltimaRilevazione"] != null
      ) {
        const deltaUmidita = Number(
          (
            ((ultimaRilevazione["umiditaUltimaRilevazione"] -
              rilevazioneGiornoPrimaUltima["umiditaUltimaRilevazione"]) /
              rilevazioneGiornoPrimaUltima["umiditaUltimaRilevazione"]) *
            100
          ).toFixed(2)
        );
        if (deltaUmidita > 0) {
          setVariazioneUmiditaUltimoGiornoMisurazione(
            "+" + deltaUmidita + "% rispetto a ieri"
          );
        } else {
          setVariazioneUmiditaUltimoGiornoMisurazione(
            "" + deltaUmidita + "% rispetto a ieri"
          );
        }
      } else {
        setVariazioneUmiditaUltimoGiornoMisurazione("");
      }

      if (
        ultimaRilevazione["pressioneUltimaRilevazione"] != null &&
        rilevazioneGiornoPrimaUltima["pressioneUltimaRilevazione"] != null
      ) {
        const deltaPressione = Number(
          (
            ((ultimaRilevazione["pressioneUltimaRilevazione"] -
              rilevazioneGiornoPrimaUltima["pressioneUltimaRilevazione"]) /
              rilevazioneGiornoPrimaUltima["pressioneUltimaRilevazione"]) *
            100
          ).toFixed(2)
        );
        if (deltaPressione > 0) {
          setVariazionePressioneUltimoGiornoMisurazione(
            "+" + deltaPressione + "% rispetto a di ieri"
          );
        } else {
          setVariazionePressioneUltimoGiornoMisurazione(
            "" + deltaPressione + "% rispetto a di ieri"
          );
        }
      } else {
        setVariazionePressioneUltimoGiornoMisurazione("");
      }

      const getMese = (giorno: string) => {
        const d = giorno.split("-");
        switch (d[1]) {
          case "01":
          case "1": {
            return "GEN";
          }
          case "02":
          case "2": {
            return "FEB";
          }
          case "03":
          case "3": {
            return "MAR";
          }
          case "04":
          case "4": {
            return "APR";
          }
          case "05":
          case "5": {
            return "MAG";
          }
          case "06":
          case "6": {
            return "GIU";
          }
          case "07":
          case "7": {
            return "LUG";
          }
          case "08":
          case "8": {
            return "AGO";
          }
          case "09":
          case "9": {
            return "SET";
          }
          case "10": {
            return "OTT";
          }
          case "11": {
            return "NOV";
          }
          case "12": {
            return "DIC";
          }
          default: {
            return "Mese non disponibile";
          }
        }
      };
      let ms = [];
      for (let i = 0; i < giorniSettimanaCorrente.length; ++i) {
        ms.push(getMese(giorniSettimanaCorrente[i]));
      }
      setMesiUltimaSettimana(ms);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ref = useRef(null);

  return (
    <>
      <HeroHeading scrollRef={ref} />

      <AnimationWrapper>
        <HeroOverview
          ref={ref}
          lastUpdate={giorniSettimanaCorrente[6].toString()}
          data={{
            temp: {
              curr: temperaturaUltimaRilevazione,
              max: maxTemperaturaSettimanale[6],
              min: minTemperaturaSettimanale[6],
              delta: variazioneTemperaturaUltimoGiornoMisurazione,
            },
            humidity: {
              curr: umiditaUltimaRilevazione,
              max: maxUmiditaSettimanale[6],
              min: minUmiditaSettimanale[6],
              delta: variazioneUmiditaUltimoGiornoMisurazione,
            },
            rain: precipitazioniSettimanali[6],
            pressure: {
              curr: pressioneUltimaRilevazione,
              max: maxPressioneSettimanale[6],
              min: minPressioneSettimanale[6],
              delta: variazionePressioneUltimoGiornoMisurazione,
            },
          }}
        />
      </AnimationWrapper>

      <div className="justify-center max-w-screen-lg px-5 m-auto mt-10 lg:grid-cols-5 lg:grid lg:gap-x-4 lg:px-0">
        <HeroWeek
          min={minTemperaturaSettimanale}
          max={maxTemperaturaSettimanale}
          days={giorniGrafico}
        />
        <HeroGraphs
          graphs={{
            temp: temperaturaSettimanale,
            humidity: umiditaSettimanale,
            pressure: pressioneSettimanale,
            rain: precipitazioniSettimanali,
          }}
          days={giorniGrafico}
        />
      </div>
    </>
  );
}
