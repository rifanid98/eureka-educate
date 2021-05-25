import { Request, Response } from 'express';
import Services from '../services';
import { Response as Resp } from '../utils/helpers/Response';
import Status from '../utils/helpers/Status';

class Controllers {
  /**
   * Get
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async get(req: Request, res: Response): Promise<Response> {
    try {
      // const params = req.params;
      const data = await Services.get();
      return res.status(Status.success).send(data);
    } catch (error) {
      return res.status(Status.error).send(Resp.error());
    }
  }
}

export default new Controllers();
