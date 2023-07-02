import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";
import data from "../utils/data";
import IUser from "../types/IUser";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: IUser,
) => {
  switch (request.url) {
    case "/api/users":
      const uuid = randomUUID();
      const bodyRes = {
        ...body,
        id: uuid,
      };
      data.push(bodyRes);
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify(bodyRes));
      break;
    default:
      response.statusCode = 400;
      response.write(`CANNOT POST ${request.url}`);
      response.end();
  }
};
