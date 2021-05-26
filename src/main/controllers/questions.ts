/** Node Libraries */
import { Request, Response } from 'express';

/** Local Libraries */
import { Response as Resp } from '../utils/helpers/response';
import Status from '../utils/helpers/status';

/** Services */
import QuestionsServices from '../services/questions';
import Helpers from '../utils/helpers/helpers';
import Schemas from '../schemas/questions';
import { Question } from '../types';

class QuestionsController {
  /**
   * Get
   * @route GET /questions
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async get(_: Request, res: Response): Promise<Response> {
    try {
      const data = await QuestionsServices.get();
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Get one data (by id)
   * @route GET /questions/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;

      const { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const data = await QuestionsServices.getById(Number(params.id));
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Post
   * @route POST /questions
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async post(req: Request, res: Response): Promise<Response> {
    try {
      const body: Question = req.body;

      if (req.file) {
        if (req.file.mimetype === 'image/jpeg' || 
          req.file.mimetype === 'image/png') {
            body.image = req.file.filename;
        } else {
          Helpers.deleteImage(req.file.filename);
          return res.status(Status.badrequest).send(Resp.badrequest("can only use JPEG and PNG format images"));
        }
      }

      if (!body.category_id || !body.sub_category_id) {
        return res.status(Status.badrequest).send(Resp.badrequest('category_id and sub_category_id is required'));
      }

      var { invalid, result } = await Helpers.validateBody(
        { question: Schemas.post.question, },
        { question: body.question },
      );
      if (invalid) return res.status(result.status).send(result);

      const fieldsToPatch = Object.keys(body);
      var { invalid, result } = await Helpers.validateBody(Schemas.post, body, fieldsToPatch);
      if (invalid) return res.status(result.status).send(result);

      const data = await QuestionsServices.post(body);
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Update
   * @route PATCH /questions/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const params: Question = req.params;
      const body: Question = req.body;

      if (req.file) {
        if (req.file.mimetype === 'image/jpeg' || 
          req.file.mimetype === 'image/png') {
            body.image = req.file.filename;
        } else {
          Helpers.deleteImage(req.file.filename);
          return res.status(Status.badrequest).send(Resp.badrequest("can only use JPEG and PNG format images"));
        }
      }
      
      var { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      if (!body.category_id || !body.sub_category_id) {
        return res.status(Status.badrequest).send(Resp.badrequest('category_id and sub_category_id is required'));
      }

      var { invalid, result } = await Helpers.validateBody(
        { question: Schemas.post.question, },
        { question: body.question },
      );
      if (invalid) return res.status(result.status).send(result);

      const fieldsToPatch = Object.keys(body);
      var { invalid, result } = await Helpers.validateBody(Schemas.patch, body, fieldsToPatch);
      if (invalid) return res.status(result.status).send(result);
      
      const data = await QuestionsServices.patch({ ...body, id: Number(params.id) });
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }

  /**
   * Delete
   * @route DELETE /questions/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.params;

      const { invalid, result } = await Helpers.validateBody(Schemas.id, { id: params.id });
      if (invalid) return res.status(result.status).send(result);

      const data = await QuestionsServices.delete({ id: Number(params.id!) });
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }
}

export default new QuestionsController();
