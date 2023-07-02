import { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';

import data from '../utils/data';
export default (request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case ('/api/users'): 
      let body = "";
      request.on("data", (chunk) => {
       body += chunk.toString();
      });
      const uuid = randomUUID();
      request.on('close', () => {
        const bodyRes = {
          ...JSON.parse(body),
          id: uuid
        }
        data.push(bodyRes);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
      })
    break;
    default:
      response.statusCode = 400
      response.write(`CANNOT POST ${request.url}`)
      response.end()
  }
}

// const testData = {
//  "id": "3232",
//   "username": "sfsf",
//   "age": 32,
//   "hobbies": ["sdfsf"]
// }