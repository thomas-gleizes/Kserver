import { IncomingMessage } from "node:http";
import Method from "./method";

type RequestCore = {
  Body?: any;
  Query?: string;
  Params?: string;
};
export default class KRequest<Core extends RequestCore = {}> {
  private _request: IncomingMessage;

  constructor(incomingMessage: IncomingMessage) {
    this._request = incomingMessage;
  }

  get url(): string {
    return this._request.url as string;
  }

  get method(): Method {
    return this._request.method as Method;
  }

  get headers(): IncomingMessage["headers"] {
    return this._request.headers;
  }

  get body(): RequestCore["Body"] {
    if ([Method.GET, Method.DELETE].includes(this.method)) return undefined;

    let body: RequestCore["Body"];
    let req = this._request;

    req.on("readable", () => {
      body += req.read();
    });

    console.log("Body", body);

    return body as RequestCore["Body"];
  }

  get ip(): string {
    return this._request.socket.remoteAddress as string;
  }
}
