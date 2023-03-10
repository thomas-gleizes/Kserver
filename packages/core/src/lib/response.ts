import { ServerResponse } from "node:http";
import Exception from "./exception";

export default class KResponse<T = unknown> {
  private _response: ServerResponse;
  private _isSent: boolean;

  constructor(response: ServerResponse) {
    this._response = response;
    this._response.statusCode = 200;
    this._isSent = false;

    this._response.setHeader("Powered-By", "Kserver");
  }

  private changeSentStatus(): void {
    if (this._isSent) throw new Exception("You can't send response twice.");
    this._isSent = true;
  }

  status(status: number): KResponse<T> {
    this._response.statusCode = status;
    return this;
  }

  setHeader(key: string, value: string): KResponse<T> {
    this._response.setHeader(key, value);
    return this;
  }

  private json(data: T): void {
    this._response.writeHead(this._response.statusCode, {
      "Content-Type": "application/json",
    });
    this._response.end(JSON.stringify(data));
  }

  private text(data: T): void {
    this._response.writeHead(this._response.statusCode, {
      "Content-Type": "text/plain",
    });
    this._response.end(data);
  }

  send(data: T): void {
    this.changeSentStatus();

    switch (typeof data) {
      case "object":
        return this.json(data);
      default:
        return this.text(data);
    }
  }
}
