import { IncomingMessage, ServerResponse } from 'http';
import  validateUuid  from '../utils/validateUuid';
import data from '../utils/data';
import IUser from '../types/IUser';

export default (request: IncomingMessage, response: ServerResponse) => {
  const idUser = request.url?.split('/')[3] || '';
  const isValid = validateUuid(idUser);
  switch(isValid){
    case(true):
      let body = "";
      request.on("data", (chunk) => {
       body += chunk.toString();
      });
      request.on('close', () => {
        const bodyRes: IUser = JSON.parse(body);
        const updatedData = data.map((user) => {
          const userUpdated =  user.id === idUser ? {...user, ...bodyRes} : user;
          return userUpdated;
        })
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(updatedData));
      })
    break;
    case(false):
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end('uuid is invalid');
    break;
    default:
      response.statusCode = 404
      response.write(`CANNOT PUT ${request.url}`)
      response.end()
    }
}
