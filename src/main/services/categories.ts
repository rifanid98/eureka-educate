/** Local Libraries */
import { IResponse, Response as Resp } from '../utils/helpers/response';

/** Repositories */
import CategoriesRepository from '../repositories/categories';
import { Category } from '../types';

class CategoriesServices {
  /**
   * Get
   * @returns {Promise<IResponse>}
   */
  async get(): Promise<IResponse> {
    try {
      const data = await CategoriesRepository.get({});
      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | get()`);
      return Resp.error();
    }
  }

  /**
   * Get one by id
   * @param {number} id
   * @returns {Promise<IResponse>}
   */
  async getById(id: number): Promise<IResponse> {
    try {
      const data = await CategoriesRepository.getOne({
        id,
      });

      if (!data) {
        return Resp.notfound(`Categories data with id ${id} not found`);
      }

      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | getById()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {Category} payload
   * @returns {Promise<IResponse>}
   */
  async post(payload: Category): Promise<IResponse> {
    try {
      const category = await CategoriesRepository.getOne({
        name: payload.name,
      });

      if (category) {
        return Resp.conflict(`Category data with the name '${payload.name}' already exists`);
      }

      const data = await CategoriesRepository.save(payload);
      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | post()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {Category} payload
   * @returns {Promise<IResponse>}
   */
  async patch(payload: Category): Promise<IResponse> {
    try {
      let category = await CategoriesRepository.getOne({
        id: payload.id,
      });

      if (!category) {
        return Resp.notfound(`Category data with id '${payload.id}' was not found`);
      }

      const data = await CategoriesRepository.update(payload, {
        id: category.id,
      });

      if (!data) {
        return Resp.error('Failed to update category data');
      }

      category = await CategoriesRepository.getOne({
        id: payload.id,
      });

      return Resp.success({ data: category });
    } catch (error) {
      console.log(error, `<<< ${__filename} | patch()`);
      return Resp.error();
    }
  }

  /**
   * Delete one data
   * @param {Category} payload
   * @returns {Promise<IResponse>}
   */
  async delete(payload: Category): Promise<IResponse> {
    try {
      const category = await CategoriesRepository.getOne({
        id: payload.id,
      });

      if (!category) {
        return Resp.notfound(`Category data with id '${payload.id}' was not found`);
      }

      const data = await CategoriesRepository.delete(payload);

      if (!data) {
        return Resp.error(`Data category with id ${payload.id} failed to be deleted`);
      }

      return Resp.success({ message: 'Category data deleted successfully' });
    } catch (error) {
      console.log(error, `<<< ${__filename} | delete()`);
      return Resp.error();
    }
  }
}

export default new CategoriesServices();
