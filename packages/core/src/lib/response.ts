import { ServerResponse } from "node:http";

export default class KResponse<T = unknown> {
  private _response: ServerResponse;

  constructor(response: ServerResponse) {
    this._response = response;
    this._response.statusCode = 200;
  }

  status(status: number): KResponse<T> {
    this._response.statusCode = status;
    return this;
  }

  send(data: T): KResponse<T> {
    this._response.writeHead(this._response.statusCode, {
      "Content-Type": "application/json",
    });
    this._response.end(JSON.stringify(data));

    return this;
  }
}
