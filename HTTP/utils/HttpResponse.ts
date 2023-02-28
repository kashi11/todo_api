import { Response } from "express";
export default class HttpResp<T> {
  constructor(public statusCode: number, public body: T) { }

  static create<ResponseBody>(statusCode: number = 500, body: ResponseBody): HttpResp<ResponseBody> {
    return new HttpResp<ResponseBody>(statusCode, body);
  }

  static convertToExpress<ResponseBody>(resp: Response, httpResp: HttpResp<ResponseBody>) {
    return resp.status(httpResp.statusCode).json(httpResp.body);
  }
}
