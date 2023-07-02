import { IncomingMessage, ServerResponse } from "http";
import getGetData from "../models/getGetData";

export default (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url || '';
  const [data, statusCode] = getGetData(url);
  if (data) {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(data);
  } else {
    response.statusCode = 400;
    response.write(`CANNOT GET ${request.url}`);
    response.end();
  }
};
