import { IncomingMessage, ServerResponse } from "http";
import validateUuid from "../utils/validateUuid";
import data from "../utils/data";

export default (request: IncomingMessage, response: ServerResponse) => {
  const userId = request.url?.split("/")[3];
  if (userId && validateUuid(userId)) {
    const user = data.filter(({ id }) => id === userId)[0];
    if (user) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(user));
      response.end();
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.write(`no user with id  ${userId}`);
      response.end();
    }
  } else {
    response.statusCode = 400;
    response.write(`CANNOT GET ${request.url}`);
    response.end();
  }
};
