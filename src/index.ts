import {server, PORT} from './app/server';
server.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});