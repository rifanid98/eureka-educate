import { NextFunction, Request, Response } from 'express';
import Schemas from '../schemas/auth';
import Helpers from '../utils/helpers/helpers';
import { Response as Resp } from '../utils/helpers/response';
import S from '../utils/helpers/status';
import Token from '../utils/helpers/token';

class AuthMiddleware {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token: string | undefined = req.headers.authorization;

      const { invalid, result } = await Helpers.validateBody(Schemas.token, { token });

      if (invalid) {
        return res.status(S.badrequest).send(result);
      }

      if (token?.split(' ')[0].toLowerCase() === 'bearer') {
        token = token.split(' ')[1];
      }

      let decode: string | undefined;

      if (token) {
        decode = Token.verifyToken(token, true).toString();

        if (decode && decode.toLowerCase().includes('jsonwebtokenerror')) {
          const message = decode.split(': ')[1];
          return res.status(S.badrequest).send(Resp.badrequest(message));
        }
      }

      req.app.locals.credentials = { user: decode };

      next();
    } catch (error) {
      return error;
    }
  }
}

export default new AuthMiddleware();
