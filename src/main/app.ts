import express, { Application, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import { config as dotenv } from 'dotenv';
import path from "path";

import Status from './utils/helpers/status';
import Routes from './routes';
import Helpers from './utils/helpers/helpers';
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configs();
    this.plugins();
    this.routes();
    dotenv();
  }

  /**
   * Configs
   */
  protected configs(): void {
    Helpers.setAppRoot(path.resolve(__dirname));
    this.app.use("/assets", express.static(Helpers.assetsPath));
  }

  /**
   * Plugins
   */
  protected plugins(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(compression());
  }

  /**
   * Routes
   */
  protected routes(): void {
    this.app.use('/', Routes);
    this.app.route('/').all((_, res: Response): Response => {
      return res.status(Status.success).send('Welcome...');
    });
  }
}

export default App;
