import { IncomingMessage, ServerResponse } from "http";
import getGetResponse from "../models/getGetResponse";

export default (request: IncomingMessage, response: ServerResponse) => {
  if (request.url) {
    const [data, statusCode] = getGetResponse(request.url);
    if (data) {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(data);
    } else {
      response.statusCode = 400;
      response.write(`CANNOT GET ${request.url}`);
      response.end();
    }
  } else {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end("wrong request");
  }
};
