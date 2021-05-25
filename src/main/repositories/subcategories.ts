import { Sequelize } from 'sequelize';
import { SubCategory } from '../types';

const Models = require('../models');

class Repositories {
  private defaultAttributes = [Sequelize.literal(`"SubCategories".*`)];

  /**
   * Get all subcategories
   * @param {SubCategory} where
   * @param {Record<string, any>} attribute
   * @param {Record<string, any>} options
   * @returns {Promise<SubCategory[]>}
   */
  get(where: SubCategory, attribute?: Record<string, any>, options?: Record<string, any>): Promise<SubCategory[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute || this.defaultAttributes;

        const subcategories = await Models.SubCategories.findAll({
          attributes,
          where,
          raw: true,
          ...options,
        });

        resolve(subcategories);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get one of category
   * @param {SubCategory} where
   * @param {Record<string, any>} attribute
   * @param {Record<string, any>} options
   * @returns {Promise<SubCategory>}
   */
  getOne(where: SubCategory, attribute?: Record<string, any>, options?: Record<string, any>): Promise<SubCategory> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute || this.defaultAttributes;

        const category = await Models.SubCategories.findOne({
          attributes,
          where,
          raw: true,
          ...options,
        });

        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Save one category
   * @param {SubCategory} payload
   * @param {Record<string, any>} options
   * @returns {Promise<SubCategory>}
   */
  save(payload: SubCategory, options?: Record<string, any>): Promise<SubCategory> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.SubCategories.create(
          {
            ...payload,
          },
          {
            returning: true,
            raw: true,
            ...options,
          },
        );

        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update one category
   * @param {SubCategory} payload
   * @param {SubCategory} where
   * @param {Record<string, any>} options
   * @returns {Promise<boolean>}
   */
  update(payload: SubCategory, where?: SubCategory, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.SubCategories.update(
          {
            ...payload,
            updated_at: Sequelize.literal(`CURRENT_TIMESTAMP`),
          },
          {
            where,
            raw: true,
            ...options,
          },
        );

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
   * @param {SubCategory} where
   * @param {Record<string, any>} options
   * @returns {Promise<boolean>}
   */
  delete(where?: SubCategory, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Models.SubCategories.destroy({
          where,
          ...options,
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
