import { Router } from 'express';

/** Controllers */
import QuestionsController from '../controllers/questions';

// /** Middleware */
// import AuthMiddleware from '../middlewares/Auth';

class QuestionsRouter {
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
    this.router.get('/', QuestionsController.get);
    this.router.get('/:id', QuestionsController.getById);
    this.router.post('/', QuestionsController.post);
    this.router.patch('/:id', QuestionsController.patch);
    this.router.delete('/:id', QuestionsController.delete);
  }
}

export default new QuestionsRouter().router;
