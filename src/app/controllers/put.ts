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
        const { username, age, hobbies}: IUser = JSON.parse(body);
        data.forEach((user) => {
          if (user.id === idUser) {
            user.age = age;
            user.username = username;
            user.hobbies = hobbies;
          }
        })
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
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
