/** Node Libraries */
import { Request, Response } from 'express';

/** Local Libraries */
import { Response as Resp } from '../utils/helpers/response';
import Status from '../utils/helpers/status';

/** Services */
import SubCategoriesServices from '../services/subcategories';
import Helpers from '../utils/helpers/helpers';
import Schemas from '../schemas/subcategories';

class SubCategoriesController {
  /**
   * Get
   * @route GET /subcategories
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async get(_: Request, res: Response): Promise<Response> {
    try {
      const data = await SubCategoriesServices.get();
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Get one data (by id)
   * @route GET /subcategories/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;

      const { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const data = await SubCategoriesServices.getById(Number(params.id));
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Post
   * @route POST /subcategories
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async post(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { invalid, result } = await Helpers.validateBody(Schemas.post, body);
      if (invalid) return res.status(result.status).send(result);

      const data = await SubCategoriesServices.post(body);
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Update
   * @route PATCH /subcategories/:id
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

      const data = await SubCategoriesServices.patch({ ...body, id: params.id });
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Delete
   * @route DELETE /subcategories/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;

      const { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const data = await SubCategoriesServices.delete({ id: Number(params.id!) });
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }
}

export default new SubCategoriesController();
