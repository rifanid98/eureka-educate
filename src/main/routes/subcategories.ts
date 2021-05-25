import { Router } from 'express';

/** Controllers */
import SubCategoriesController from '../controllers/subcategories';

// /** Middleware */
// import AuthMiddleware from '../middlewares/Auth';

class SubCategoriesRouter {
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
    this.router.get('/', SubCategoriesController.get);
    this.router.get('/:id', SubCategoriesController.getById);
    this.router.post('/', SubCategoriesController.post);
    this.router.patch('/:id', SubCategoriesController.patch);
    this.router.delete('/:id', SubCategoriesController.delete);
  }
}

export default new SubCategoriesRouter().router;
