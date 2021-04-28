import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import path from "path";

export interface DataObject {
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

const dbPath = path.resolve(`${__dirname}`, '..', 'data/database.json')

export const getOne = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = await fs.promises.readFile(dbPath);
    const parsedData = JSON.parse(data.toString());

    if (req.url) {
      const urlParams = +req.url.split('/')[1];
      let dataResponse = parsedData.find((el: DataObject) => el.id  === urlParams);
      if (!dataResponse) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'data no found' }));
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(dataResponse));
      }
    }

  } catch (e) {
    res.writeHead(200, { 'content-type': 'application/json' });
    console.log(e);
    res.end(
      JSON.stringify({
        status: 'fail',
        message: 'unable to complete request, an error ocurred 🚫 ',
      })
    );
  }
};

export const createOne = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const formerData = await fs.promises.readFile(dbPath);
    let parsedData = JSON.parse(formerData.toString())
    const lastId = parsedData[parsedData.length - 1].id;
    req.on('data', async (chunk) => {
      let newData = {
        id: lastId + 1,
        createdAt: new Date(Date.now()),
        ...JSON.parse(chunk),
      };
      parsedData.push(newData);
      await fs.promises.writeFile(
        dbPath,
        JSON.stringify(parsedData)
      );
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(newData));
    });
  } catch (error) {
    req.on('data', async (chunk) => {
      let newData = [
        { id: 1, createdAt: new Date(Date.now()), ...JSON.parse(chunk.toString()) },
      ];
      await fs.promises.writeFile(
        dbPath,
        JSON.stringify(newData)
      );
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(newData));
    });
  }
};

export const updateOne = async (req:IncomingMessage, res:ServerResponse) => {
  try {
    const data = await fs.promises.readFile(dbPath);
    let parsedData = JSON.parse(data.toString());

    if (req.url) {
      const urlParams = +req.url.split('/')[1];
      let dataToUpdate = parsedData.find((el:DataObject) => el.id === urlParams);
      const dataIndex = parsedData.findIndex((el:DataObject) => el.id === urlParams);
  
      if (dataToUpdate) {
        req.on('data', async (chunk) => {
          const newData = {
            ...dataToUpdate,
            ...JSON.parse(chunk),
            updatedAt: new Date(Date.now()),
          };
          parsedData.splice(dataIndex, 1, newData);
          await fs.promises.writeFile(dbPath,
            JSON.stringify(parsedData)
          );
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(newData));
        });
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'data not found 🚫' }));
      }
    }
  } catch (e) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'fail',
        message: '🚫 unable to complete request, an error ocurred',
      })
    );
  }
};

export const deleteOne = async (req:IncomingMessage, res:ServerResponse) => {
  try {
    const data = await fs.promises.readFile(dbPath);
    let parsedData = JSON.parse(data.toString());

    if (req.url) {
      const urlParams = +req.url.split('/')[1];
      let dataToDelete = parsedData.find((el: DataObject) => el.id === urlParams);
      const dataIndex = parsedData.findIndex((el: DataObject) => el.id === urlParams);
  
      if (dataToDelete) {
        parsedData.splice(dataIndex, 1);
        await fs.promises.writeFile(dbPath,
          JSON.stringify(parsedData)
        );
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', message: 'data deleted!' }));
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'data not found 🚫 ' }));
      }

    }
  } catch (e) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'fail',
        message: '🚫 unable to complete request, an error ocurred',
      })
    );
  }
};

export const getAll = async (res: ServerResponse) => {
  try {
    const data = await fs.promises.readFile(dbPath);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  } catch (e) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end('🚫 data does not exist');
  }
};