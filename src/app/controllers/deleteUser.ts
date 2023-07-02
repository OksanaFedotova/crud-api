import { IncomingMessage, ServerResponse } from "http";
import validateUuid from "../utils/validateUuid";
import data from "../utils/data";

export default (request: IncomingMessage, response: ServerResponse) => {
  const idUser = request.url?.split("/")[3] || "";
  const isValid = validateUuid(idUser);
  switch (isValid) {
    case true:
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("close", () => {
        const index = data.findIndex(({ id }) => id === idUser);
        if (index !== -1) {
          data.splice(index, 1);
          response.writeHead(204, { "Content-Type": "application/json" });
          response.end();
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.write(`no user with id  ${idUser}`);
          response.end();
        }
      });
      break;
    case false:
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end("uuid is invalid");
      break;
    default:
      response.statusCode = 404;
      response.write(`CANNOT DELETE ${request.url}`);
      response.end();
  }
};
