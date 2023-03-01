import { createServer } from "node:http";

import { ExceptionHandler, Handler, ListenResult } from "./types";
import KRequest from "./request";
import KResponse from "./response";
import Route from "./route";
import Method from "./method";
import Exception from "./exception";

export default class KServer {
  private readonly _routes: Array<Route>;
  private _exceptionHandler?: ExceptionHandler;

  constructor() {
    this._routes = [];
    this._exceptionHandler = undefined;
  }

  private addRoute(pathname: string, method: Method, ...handlers: Handler[]) {
    if (handlers.length === 0)
      throw new Exception(
        "You must provide at least one handler for this route."
      );

    this._routes.push(new Route(pathname, method, handlers));
  }

  public get(pathname: string, ...handlers: Handler[]): KServer {
    this.addRoute(pathname, Method.GET, ...handlers);
    return this;
  }

  public post(pathname: string, ...handlers: Handler[]): KServer {
    this.addRoute(pathname, Method.POST, ...handlers);
    return this;
  }

  public put(pathname: string, ...handlers: Handler[]): KServer {
    this.addRoute(pathname, Method.PUT, ...handlers);
    return this;
  }

  public delete(pathname: string, ...handlers: Handler[]): KServer {
    this.addRoute(pathname, Method.DELETE, ...handlers);
    return this;
  }

  public patch(pathname: string, ...handlers: Handler[]): KServer {
    this.addRoute(pathname, Method.PATCH, ...handlers);
    return this;
  }

  public exceptionHandler(handler: ExceptionHandler): KServer {
    this._exceptionHandler = handler;

    return this;
  }

  public listen(port: number): Promise<ListenResult> {
    const server = createServer(async (req, res) => {
      let isMatched = false;

      const request = new KRequest(req);
      const response = new KResponse(res);

      try {
        for (const route of this._routes) {
          if (route.isMatch(request.url as string, request.method as Method)) {
            isMatched = true;

            for (const handler of route.getHandlers()) {
              await handler(request, response);
            }
          }
        }

        if (!isMatched)
          return response.status(404).send({
            success: false,
            message: "Not Found",
            method: request.method,
            url: request.url,
          });
      } catch (error) {
        if (this._exceptionHandler)
          return this._exceptionHandler(error as Error, request, response);

        return response.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    return new Promise((resolve) => {
      server.listen(
        port,
        () => void resolve({ url: `http://localhost:${port}` })
      );
    });
  }
}
