import { createServer, IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 4000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.method) {
    case "GET":
      switch (request.url) {
        // response for unexpected get requests
        default:
          response.statusCode = 400
          response.write(`CANNOT GET ${request.url}`)
          response.end
      }
      break

    case "POST":
      break

    case "PUT":
      break

    case "DELETE":
      break

    default:
      // Send response for requests with no other response
      response.statusCode = 400
      response.write("No Response")
      response.end()
  }
})

server.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});