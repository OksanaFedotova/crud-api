import { IncomingMessage, ServerResponse } from "http";
import getPostResponse from "../models/getPostResponse";
import IUser from "../types/IUser";
import isCluster from "../utils/isCluster";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: IUser,
) => {
  if (request.url && request.url === "/api/users") {
    const [message, statusCode] = getPostResponse(request.url, body);
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(message);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end("wrong request");
  }
};
