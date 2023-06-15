import express, { Application } from 'express';
import postRoutes from '../routes/post.routes';
import cors from 'cors';

class Server {
  private app: Application;
  private port: string | number;
  private apiPaths = {
    posts: '/api/posts'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000

    this.middlewares();

    this.routes();

  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.posts, postRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;