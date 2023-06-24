import express, { Application } from 'express';
import postRoutes from '../routes/post.routes';
import userRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';
import cors from 'cors';
import db from '../db/config';

class Server {
  private app: Application;
  private port: string | number;
  private apiPaths = {
    posts: '/api/posts',
    users: '/api/users'
  }
  private authPath = {
    auth: '/api/auth'
  }

  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT || 3000

    this.dbConnection();

    this.middlewares();

    this.routes();

  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath.auth, authRoutes);
    this.app.use(this.apiPaths.posts, postRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
