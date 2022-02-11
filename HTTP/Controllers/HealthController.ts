import HttpResp from "../../App/Application/Utils/HttpResponse";
import HttpStatusCode from "../../App/Application/Utils/HttpStatusCode";

export default class HealthController {
  healthCheck = async (req: any, res: any) => {
    return HttpResp.convertToExpress(res, HttpResp.create(HttpStatusCode.OK, { message: "Server is up and running" }));
  };
}
