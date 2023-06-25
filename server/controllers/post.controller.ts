import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

export const getPosts = (req: Request, res: Response) => {
  res.json({
    msg: 'getPosts'
  });
}


export const getPostsByUser = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  res.send([{ "id": 2, "title": "post", "photoUrls": ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fmundo%2Fnoticias-48676663&psig=AOvVaw04gQ56UtLP_dP5s2E4deVd&ust=1687815252218000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNiywfKv3_8CFQAAAAAdAAAAABAE"], "description": "post de prueba", "age": "1 año", "gender": "macho", "type": "dog", "size": "grande", "location": "montevideo, Uruguay" }])
  /*
  if (existsUserWithId(userId)) {
    res.send(JSON.stringify(filterTasksByUserId(userId)));
  } else {
    res.status(404).send(JSON.stringify({
      'code': ErrorCodes.UNKNOWN_USER,
    }));
  }
  */
};