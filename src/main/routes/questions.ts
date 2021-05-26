import { Router } from 'express';

/** Controllers */
import QuestionsController from '../controllers/questions';
import { upload } from '../utils/helpers/helpers';

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
    this.router.post('/', upload.single("image"), QuestionsController.post);
    this.router.patch('/:id', upload.single("image"), QuestionsController.patch);
    this.router.delete('/:id', QuestionsController.delete);
  }
}

export default new QuestionsRouter().router;
