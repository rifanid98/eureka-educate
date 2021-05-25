import { Router } from 'express';
import CategoriesRoutes from './categories';

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
    this.router.use('/categories', CategoriesRoutes);
  }
}

export default new AppRouter().router;
