import { IncomingMessage, ServerResponse } from "http";
import checkRequest from "./checkRequest";
import IUser from "../types/IUser";

export default (
  request: IncomingMessage,
  response: ServerResponse,
  next: (req: IncomingMessage, res: ServerResponse, body: IUser) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    let data: Uint8Array[] = [];
    request.on("data", (dataChunk) => {
      data.push(dataChunk);
    });
    request.on("end", () => {
      const body = Buffer.concat(data).toString();
      if (request.headers["content-type"] === "application/json") {
        if (checkRequest(JSON.parse(body))) {
          next(request, response, JSON.parse(body));
        } else {
          response.statusCode = 400;
          response.write(`missing or invalid required fields`);
          response.end();
        }
      }
      resolve();
    });
    request.on("error", () => {
      response.statusCode = 500;
      response.write(`body isn't correct`);
      response.end();
      reject();
    });
  });
};
