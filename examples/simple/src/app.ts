import { KResponse, KServer } from "@kserver/core";

const server = new KServer();

server.get(
  "/",
  (request, response: KResponse<{ success: boolean; message: string }>) => {
    response.send({
      success: true,
      message: "Hello World",
    });
  }
);

server.listen(8000).then(({ url }) => console.log("server start on " + url));
