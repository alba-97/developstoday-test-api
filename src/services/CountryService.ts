import { ICountry } from "@src/models/Country";
import CountryRepo from "@src/repos/CountryRepo";

function getAll(): Promise<ICountry[]> {
  return CountryRepo.getAll();
}

function getOne(countryCode: string): Promise<ICountry | null> {
  return CountryRepo.getOne(countryCode);
}

export default {
  getAll,
  getOne,
} as const;
