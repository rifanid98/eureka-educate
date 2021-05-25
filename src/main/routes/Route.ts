import { Router } from 'express';

/** Controllers */
import Controllers from '../controllers';

// /** Middleware */
// import AuthMiddleware from '../middlewares/Auth';

class RouteRouter {
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
    this.router.get('/', Controllers.get);
  }
}

export default new RouteRouter().router;
