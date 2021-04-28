import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import { getOne, createOne, updateOne, deleteOne, getAll } from './controllers/factoryFunctions';
/*
implement your server code here
*/

export interface Org {
  id: number,
  organization: string,
  products: string[],
  marketValue: string,
  address: string,
  ceo: string,
  country: string,
  noOfEmployees: number,
  employees: string[]
  createdAt: Date,
  updatedAt?: Date
}

const server :Server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      getAll(res)
    } else {
      await getOne(req, res);
    }
  } else if (req.method === 'POST') {
    // create one
    await createOne(req, res);
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    updateOne(req, res);
  } else if (req.method === 'DELETE') {
    deleteOne(req, res);
  }
  }
);

server.listen(3005, () => {
  console.log('Server fired 🔥 up on port 3005');
});
