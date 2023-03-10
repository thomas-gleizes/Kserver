import {
  Exception,
  KRequest,
  KResponse,
  KServer,
  PluginCallBack,
} from "@kalat/kserver";

const server = new KServer();

server.exceptionHandler((error, request, response) => {
  if (error instanceof Exception) {
    return void response.status(505).send({
      success: false,
      message: "erreur controlée",
    });
  }

  return void response
    .status(500)
    .send({ success: false, message: "erreur non controlée" });
});

const middleware = async (request: KRequest) => {
  const token = request.headers["token"];

  console.log("Request.body", request.body);
};

server.get(
  "/",
  middleware,
  (request, response: KResponse<{ success: boolean; message: string }>) => {
    response.send({
      success: true,
      message: "Hello World",
    });
  }
);

const pluginsRoutes: PluginCallBack = (instance: KServer) => {
  instance.get("/test", (request, response) => {
    response.send({ success: true, url: request.url });
  });
};

server.register(pluginsRoutes, { prefix: "/api" });

server.get("/error", (request, response) => {
  throw new Error("Error");
});

server.listen(8000).then(({ url }) => console.log("server start on " + url));
