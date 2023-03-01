import KRequest from "./request";
import KResponse from "./response";

export type HandlerCore = {
  Body?: unknown;
  Query?: unknown;
  Params?: unknown;
  Data?: unknown;
};

export declare type Handler<Core extends HandlerCore = {}> = (
  request: KRequest,
  response: KResponse
) => void | Promise<void>;

export declare type ListenResult = {
  url: string;
};
