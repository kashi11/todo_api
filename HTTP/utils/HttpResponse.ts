export default class HttpResp {
  constructor(public statusCode: number, public body: any) {}

  static create(statusCode: number = 500, body: any): HttpResp {
    return new HttpResp(statusCode, body);
  }

  static convertToExpress(resp: any, httpResp: HttpResp): object {
    return resp.status(httpResp.statusCode).json(httpResp.body);
  }
}
