import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

export const getPosts = (req: Request, res: Response) => {
  res.json({
    msg: 'getPosts'
  });
}


  app.get('/users/:userId/publications', (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    /*
    if (existsUserWithId(userId)) {
      res.send(JSON.stringify(filterTasksByUserId(userId)));
    } else {
      res.status(404).send(JSON.stringify({
        'code': ErrorCodes.UNKNOWN_USER,
      }));
    }
    */
  });