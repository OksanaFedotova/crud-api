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
  // const idUser = request.url?.split("/")[3] || "";
  // const isValid = validateUuid(idUser);
  // switch (isValid) {
  //   case true:
  //     const { username, age, hobbies }: IUser = body;
  //     data.forEach((user) => {
  //       if (user.id === idUser) {
  //         user.age = age;
  //         user.username = username;
  //         user.hobbies = hobbies;
  //       }
  //       response.writeHead(200, { "Content-Type": "application/json" });
  //       response.end(JSON.stringify(data));
  //       process.send? process.send({ cmd: 'put', user: JSON.stringify(data) }) : null;
  //     });
  //     break;
  //   case false:
  //     response.writeHead(400, { "Content-Type": "application/json" });
  //     response.end("uuid is invalid");
  //     break;
  //   default:
  //     response.statusCode = 404;
  //     response.write(`CANNOT PUT ${request.url}`);
  //     response.end();
  // }
};
