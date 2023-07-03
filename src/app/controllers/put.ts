import { IncomingMessage, ServerResponse } from "http";
import validateUuid from "../utils/validateUuid";
import data from "../utils/data";
import IUser from "../types/IUser";
import getPutResponse from "../models/getPutResponse";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: IUser,
) => {
  if (request.url) {
    const [message, statusCode] = getPutResponse(request.url, body);
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(message);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(`CANNOT PUT ${request.url}`);
  }
};
