import { IncomingMessage, ServerResponse } from "http";
import getDeleteResponse from "../models/getDeleteResponse";
import IUser from "../types/IUser";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: IUser,
) => {
  if (request.url) {
    const [message, statusCode] = getDeleteResponse(request.url);
    request.on("close", () => {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      message.length ? response.end(message) : response.end();
    });
  } else {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end("wrong request");
  }
};
