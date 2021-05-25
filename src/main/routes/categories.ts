import { Router } from 'express';

/** Controllers */
import CategoriesController from '../controllers/categories';

// /** Middleware */
// import AuthMiddleware from '../middlewares/Auth';

class CategoriesRouter {
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
    this.router.get('/', CategoriesController.get);
    this.router.post('/', CategoriesController.post);
    this.router.patch('/:id', CategoriesController.patch);
    this.router.delete('/:id', CategoriesController.delete);
  }
}

export default new CategoriesRouter().router;
