import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import { server, PORT } from '../server';
import data from '../utils/data';
import IUser from '../types/IUser';


const numCPUs = availableParallelism();
const workers = [];
if (cluster.isPrimary) {
   
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({ PORT: +PORT + i });
    workers.push(worker);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Starting another worker");
    cluster.fork();
  });
  cluster.on('message', (worker, msg) => {
    worker.send(msg.data);
  })
} else if (cluster.isWorker) {
  const port = process.env.PORT;
  process.on('message', (msg: IUser) => {
    data.push(msg);
  })
  server.listen(port, () => {
      console.log(`Worker ${process.pid} started server on ${port}`);
    });
}