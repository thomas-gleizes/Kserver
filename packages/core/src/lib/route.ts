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

  isMatch(pathname: string, method: Method, exact: boolean = true): Boolean {
    if (this._method !== method) return false;

    if (exact) return this._pathname === pathname;

    // Sinon, on sépare les chemins en segments
    const routeSegments = this._pathname.split("/");
    const pathSegments = pathname.split("/");

    // Si les chemins ont un nombre différent de segments, ils ne correspondent pas
    if (routeSegments.length !== pathSegments.length) {
      return false;
    }

    // On compare chaque segment de chaque chemin, en ignorant les segments vides
    for (let i = 0; i < routeSegments.length; i++) {
      const segment1 = routeSegments[i];
      const segment2 = pathSegments[i];
      if (segment1 !== segment2 && segment1 !== "" && segment2 !== "") {
        return false;
      }
    }

    // Si toutes les comparaisons ont réussi, les chemins correspondent
    return true;
  }
}
