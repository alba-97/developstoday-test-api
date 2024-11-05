import axios from "axios";
import orm from "./MockOrm";
import { ICountry } from "@src/models/Country";

async function getAll(): Promise<ICountry[]> {
  const { data } = await axios.get(
    "https://date.nager.at/api/v3/AvailableCountries"
  );
  return data;
}

async function getOne(countryCode: string): Promise<ICountry | null> {
  const { data } = await axios.get(
    `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
  );

  const { data: population } = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/population",
    {
      country: data.commonName,
    }
  );

  const { data: countryFlag } = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/flag/images",
    {
      country: data.commonName,
    }
  );

  return { ...data, ...population.data, ...countryFlag.data };
}

export default {
  getAll,
  getOne,
} as const;
