import HttpResp from "../utils/HttpResponse";
import HttpStatusCode from "../../App/Application/Utils/ResponseStatus";
import { Request, Response } from "express";


export default class HealthController {
  healthCheck = async (_req: Request, res: Response) => {
    return HttpResp.convertToExpress(res, HttpResp.create(HttpStatusCode.OK, { message: "Server is up and running" }));
  };
}
