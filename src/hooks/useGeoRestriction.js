import { useEffect, useState } from "react";

/**
 * Belarus       | BY
 * Cuba          | CU
 * Iran          | IR
 * Iraq          | IQ
 * Côte d'Ivoire | CI
 * Libya         | LY
 * Somalia       | SO
 * Liberia       | LR
 * Sudan         | SD
 * South Sudan   | SS
 * Syria         | SY
 * Zimbabwe      | ZW
 **/
const restrictedCountryCodes = [
  "BY",
  "CU",
  "IR",
  "IQ",
  "CI",
  "LY",
  "SO",
  "LR",
  "SD",
  "SS",
  "SY",
  "ZW",
];

export default function useGeoRestriction() {
  const [geo, setGeo] = useState();

  useEffect(() => {
    window
      .fetch("/api/geo")
      .then((resp) => resp.json())
      .then(setGeo);
  }, []);

  return geo?.country ? restrictedCountryCodes.includes(geo.country) : false;
}
