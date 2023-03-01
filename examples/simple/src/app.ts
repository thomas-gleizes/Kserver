import { Exception, KResponse, KServer } from "@kalat/kserver";
import * as http from "http";

const server = new KServer();

// server.exceptionHandler((error, request, response) => {
//   if (error instanceof Exception) {
//     return void response.status(505).send({
//       success: false,
//       message: "erreur controlée",
//     });
//   }
//
//   return void response
//     .status(500)
//     .send({ success: false, message: "erreur non controlée" });
// });

server.get(
  "/",
  (request, response: KResponse<{ success: boolean; message: string }>) => {
    response.send({
      success: true,
      message: "Hello World",
    });
  }
);

server.get("/error", (request, response) => {
  throw new Error("Error");
});

server.listen(8000).then(({ url }) => console.log("server start on " + url));
