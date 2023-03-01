import { ServerResponse } from "node:http";
import Exception from "./exception";

export default class KResponse<T = unknown> {
  private _response: ServerResponse;
  private _isSended: boolean;

  constructor(response: ServerResponse) {
    this._response = response;
    this._response.statusCode = 200;
    this._isSended = false;
  }

  status(status: number): KResponse<T> {
    this._response.statusCode = status;
    return this;
  }

  send(data: T): KResponse<T> {
    if (this._isSended) throw new Exception("You can't send response twice.");

    this._response.writeHead(this._response.statusCode, {
      "Content-Type": "application/json",
    });
    this._response.end(JSON.stringify(data));
    this._isSended = true;

    return this;
  }
}
