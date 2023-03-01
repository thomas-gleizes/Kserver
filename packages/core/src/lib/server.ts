import { createServer } from "node:http";
import KRequest from "./request";
import KResponse from "./response";
import Route from "./route";
import Method from "./method";
import { Handler, ListenResult } from "./types";

export default class KServer {
  private readonly _routes: Array<Route>;

  constructor() {
    this._routes = [];
  }

  private addRoute(pathname: string, method: Method, ...handlers: Handler[]) {
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

  public listen(port: number): Promise<ListenResult> {
    const server = createServer(async (req, res) => {
      let isMatched = false;

      const request = new KRequest(req);
      const response = new KResponse(res);

      for (const route of this._routes) {
        if (route.isMatch(request.url as string, request.method as Method)) {
          isMatched = true;

          for (const handler of route.getHandlers()) {
            await handler(request, response);
          }
        }
      }

      if (!isMatched) {
        response.status(404).send({
          success: false,
          message: "Not Found",
          method: request.method,
          url: request.url,
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
