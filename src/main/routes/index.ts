/** Libraries */
import { Router } from 'express';

/** Routes */
import CategoriesRoutes from './categories';
import SubCategoriesRoutes from './subcategories';
import QuestionsRoutes from './questions';

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
    this.router.use('/subcategories', SubCategoriesRoutes);
    this.router.use('/questions', QuestionsRoutes);
  }
}

export default new AppRouter().router;
