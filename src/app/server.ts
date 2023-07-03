import "dotenv/config";
import { createServer, IncomingMessage, ServerResponse } from "http";
import get from "./controllers/get";
import post from "./controllers/post";
import put from "./controllers/put";
import deleteUser from "./controllers/deleteUser";
import getBody from "./utils/getBody";

const PORT = process.env.PORT || 4000;

const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    if (request.url?.startsWith("/api/users")) {
      switch (request.method) {
        case "GET":
          get(request, response);
          break;
        case "POST":
          await getBody(request, response, post);
          break;
        case "PUT":
          await getBody(request, response, put);
          break;
        case "DELETE":
          await getBody(request, response, deleteUser);
          break;
        default:
          response.statusCode = 400;
          response.write("wrong request method");
          response.end();
      }
    } else {
      response.statusCode = 404;
      response.write("wrong request url");
      response.end();
    }
  },
);

export { server, PORT };
