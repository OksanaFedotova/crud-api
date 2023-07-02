import { createServer, IncomingMessage, ServerResponse } from "http";
//import url from 'node:url';
import get from "./controllers/get";
import post from "./controllers/post";
import put from "./controllers/put";
import deleteUser from "./controllers/deleteUser";
import data from "./utils/data";
import getBody from "./utils/getBody";

const PORT = process.env.PORT || 4000;

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    switch (request.method) {
      case "GET":
        if (request.url === "/api/users") {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify(data));
        } else {
          get(request, response);
        }
        break;

      case "POST":
        getBody(request, response, post);
        break;

      case "PUT":
        getBody(request, response, put);
        break;

      case "DELETE":
        deleteUser(request, response);
        break;
      default:
        // Send response for requests with no other response
        response.statusCode = 400;
        response.write("No Response");
        response.end();
    }
  },
);

//server.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});
export { server, PORT };
