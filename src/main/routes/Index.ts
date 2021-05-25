import { Router } from 'express';
import Route from './Route';

class AppRouter {
  public router: Router;

  /**
   * Init express.Router inistance
   * and use the routes
   */
  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Routes
   */
  public routes() {
    this.router.use('/', Route);
  }
}

export default new AppRouter().router;
