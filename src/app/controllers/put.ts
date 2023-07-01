import { IncomingMessage, ServerResponse } from 'http';

export default (request: IncomingMessage, response: ServerResponse) => {
    switch(request.url){


        default:
            response.statusCode = 400
            response.write(`CANNOT PUT ${request.url}`)
            response.end()

    }
}