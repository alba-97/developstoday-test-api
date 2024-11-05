import HttpStatusCodes from "@src/common/HttpStatusCodes";

import { IReq, IRes } from "./common/types";
import CountryService from "@src/services/CountryService";

async function getAll(_: IReq, res: IRes) {
  const countries = await CountryService.getAll();
  res.status(HttpStatusCodes.OK).send(countries);
}

async function getOne(req: IReq, res: IRes) {
  const countryCode = req.params.countryCode as string;
  const country = await CountryService.getOne(countryCode);
  res.status(HttpStatusCodes.OK).send(country);
}

export default {
  getAll,
  getOne,
} as const;
