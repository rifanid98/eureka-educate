/** Local Libraries */
import { IResponse, Response as Resp } from '../utils/helpers/response';

/** Repositories */
import SubCategoriesRepository from '../repositories/subcategories';
import { SubCategory } from '../types';

class CategpriesServices {

  /**
   * Get
   * @returns {Promise<IResponse>}
   */
  async get(): Promise<IResponse> {
    try {
      const data = await SubCategoriesRepository.get({});
      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | get()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {SubCategory} payload
   * @returns {Promise<IResponse>}
   */
  async post(payload: SubCategory): Promise<IResponse> {
    try {
      const subcategory = await SubCategoriesRepository.getOne({
        name: payload.name
      });

      if (subcategory) {
        return Resp.conflict(`SubCategory data with the name '${payload.name}' already exists`);
      }

      const data = await SubCategoriesRepository.save(payload);
      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | post()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {SubCategory} payload
   * @returns {Promise<IResponse>}
   */
  async patch(payload: SubCategory): Promise<IResponse> {
    try {
      let subcategory = await SubCategoriesRepository.getOne({
        id: payload.id
      });

      if (!subcategory) {
        return Resp.notfound(`SubCategory data with id '${payload.id}' was not found`);
      }

      const data = await SubCategoriesRepository.update(payload, {
        id: subcategory.id
      });

      if (!data) {
        return Resp.error("Failed to update subcategory data");
      }

      subcategory = await SubCategoriesRepository.getOne({
        id: payload.id
      });

      return Resp.success({ data: subcategory });
    } catch (error) {
      console.log(error, `<<< ${__filename} | post()`);
      return Resp.error();
    }
  }

  /**
   * Delete one data
   * @param {SubCategory} payload
   * @returns {Promise<IResponse>}
   */
  async delete(payload: SubCategory): Promise<IResponse> {
    try {
      let subcategory = await SubCategoriesRepository.getOne({
        id: payload.id
      });

      if (!subcategory) {
        return Resp.notfound(`SubCategory data with id '${payload.id}' was not found`);
      }

      const data = await SubCategoriesRepository.delete(payload);

      if (!data) {
        return Resp.error(`Data subcategory with id ${payload.id} failed to be deleted`);
      }

      return Resp.success({ message: "SubCategory data deleted successfully" });
    } catch (error) {
      console.log(error, `<<< ${__filename} | post()`);
      return Resp.error();
    }
  }
  
}

export default new CategpriesServices();
