import { Router } from "express";

import Paths from "../common/Paths";
import CountryRoutes from "./CountryRoutes";

const apiRouter = Router();

const countryRouter = Router();

countryRouter.get(Paths.Countries.GetAll, CountryRoutes.getAll);
countryRouter.get(Paths.Countries.GetOne, CountryRoutes.getOne);

apiRouter.use(Paths.Countries.Base, countryRouter);

export default apiRouter;
