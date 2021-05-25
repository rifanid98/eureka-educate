/** Node Libraries */
import { Request, Response } from 'express';

/** Local Libraries */
import { Response as Resp } from '../utils/helpers/response';
import Status from '../utils/helpers/status';

/** Services */
import CategoriesServices from '../services/categories';
import Helpers from '../utils/helpers/helpers';
import Schemas from '../schemas/categories';

class CategoriesController {

  /**
   * Get
   * @route GET /categories
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const data = await CategoriesServices.get();
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Post
   * @route POST /categories
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
   async post(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      var { invalid, result } = await Helpers.validateBody(Schemas.post, body);
      if (invalid) return res.status(result.status).send(result);

      const data = await CategoriesServices.post(body);
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Update
   * @route PATCH /categories/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;
      const body = req.body;

      var { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const fieldsToPatch = Object.keys(body);
      var { invalid, result } = await Helpers.validateBody(Schemas.patch, body, fieldsToPatch);
      if (invalid) return res.status(result.status).send(result);

      const data = await CategoriesServices.patch({...body, id: params.id});
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Delete
   * @route DELETE /categories/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;

      var { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const data = await CategoriesServices.delete({id: Number(params.id!)});
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }
  
}

export default new CategoriesController();
