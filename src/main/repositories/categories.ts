import { Sequelize } from "sequelize";
import { Category } from "../types";

const Models = require('../models');

class Repositories {
  private defaultAttributes = [Sequelize.literal(`"Categories".*`)]

  /**
   * Get all categories
   * @param {Category} where 
   * @param {Record<string, any>} attribute 
   * @param {Record<string, any>} options 
   * @returns {Promise<Category[]>}
   */
  get(where: Category, attribute?: Record<string, any>, options?: Record<string, any>): Promise<Category[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute ? attribute : this.defaultAttributes;

        const categories = await Models.Categories.findAll({
          attributes,
          where,
          raw: true,
          ...options
        });

        resolve(categories);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get one of category
   * @param {Category} where 
   * @param {Record<string, any>} attribute 
   * @param {Record<string, any>} options 
   * @returns {Promise<Category>}
   */
  getOne(where: Category, attribute?: Record<string, any>, options?: Record<string, any>): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute ? attribute : this.defaultAttributes;

        const category = await Models.Categories.findOne({
          attributes,
          where,
          raw: true,
          ...options
        });

        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Save one category
   * @param {Category} payload 
   * @param {Record<string, any>} options 
   * @returns {Promise<Category>}
   */
   save(payload: Category, options?: Record<string, any>): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.Categories.create({
          ...payload
        }, {
          returning: true,
          raw: true,
          ...options
        });

        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update one category
   * @param {Category} payload 
   * @param {Category} where 
   * @param {Record<string, any>} options 
   * @returns {Promise<boolean>}
   */
  update(payload: Category, where?: Category, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.Categories.update({
          ...payload,
          updated_at: Sequelize.literal(`CURRENT_TIMESTAMP`)
        }, {
          where,
          raw: true,
          ...options
        });

        if (category[0] < 1) {
          resolve(false);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Delete one category
   * @param {Category} where 
   * @param {Record<string, any>} options 
   * @returns {Promise<boolean>}
   */
  delete(where?: Category, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.Categories.destroy({
          where,
          ...options
        });

        if (category[0] < 1) {
          resolve(false);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }


}

export default new Repositories();
