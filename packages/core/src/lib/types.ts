import KRequest from "./request";
import KResponse from "./response";
import KServer from "./server";

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

export declare type ExceptionHandler = (
  error: Error,
  request: KRequest,
  response: KResponse
) => void | Promise<void>;

export declare type PluginOptions<Options = unknown> = {
  prefix: string;
} & Options;

export declare type PluginCallBack<Options = unknown> = (
  instance: KServer,
  options: PluginOptions
) => Promise<void> | void;

export declare type PluginHandler<Options = unknown> = (
  pluginCallback: PluginCallBack<Options>,
  options: PluginOptions<Options>
) => KServer;
