import { IncomingMessage, ServerResponse } from "http";
import getPostResponse from "../models/getPostResponse";
import IUser from "../types/IUser";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: IUser,
) => {
  if (request.url) {
    const [message, statusCode] = getPostResponse(request.url, body);
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(message);
  } else {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end("wrong request");
  }
};
