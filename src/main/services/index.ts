import Repositories from '../repositories';
import { IResponse, Response } from '../utils/helpers/Response';

class Services {
  /**
   * Get
   * @returns {Promise<IResponse>}
   */
  async get(): Promise<IResponse> {
    try {
      const data = await Repositories.get(Math.random());
      return Promise.resolve(Response.success({ data }));
    } catch (error) {
      console.log(error, `<<< ${__filename} | get()`);
      return Promise.reject(Response.error());
    }
  }
}

export default new Services();
