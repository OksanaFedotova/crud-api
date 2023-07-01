import { IncomingMessage, ServerResponse } from 'http';

export default (request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    // response for unexpected get requests
    default:
      response.statusCode = 400
      response.write(`CANNOT DELETE ${request.url}`)
      response.end()
  }
}