import Method from "./method";
import { Handler } from "./types";

export default class Route {
  private readonly _pathname: string;
  private readonly _method: Method;
  private _handlers: Handler[];

  constructor(pathname: string, method: Method, handlers: Array<Handler>) {
    this._pathname = pathname;
    this._handlers = handlers;
    this._method = method;
  }

  getHandlers() {
    return this._handlers;
  }

  isMatch(pathname: string, method: Method): Boolean {
    return this._pathname === pathname && this._method === method;
  }
}
