import { Sequelize } from 'sequelize';
import { Question } from '../types';

const Models = require('../models');

class QuestionsRepositories {
  private defaultAttributes = [Sequelize.literal(`"Questions".*`)];

  /**
   * Get all questions
   * @param {Question} where
   * @param {Record<string, any>} attribute
   * @param {Record<string, any>} options
   * @returns {Promise<Question[]>}
   */
  get(where: Question, attribute?: Record<string, any>, options?: Record<string, any>): Promise<Question[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute || this.defaultAttributes;

        const questions = await Models.Questions.findAll({
          attributes,
          where,
          raw: true,
          ...options,
        });

        resolve(questions);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get one of question
   * @param {Question} where
   * @param {Record<string, any>} attribute
   * @param {Record<string, any>} options
   * @returns {Promise<Question>}
   */
  getOne(where: Question, attribute?: Record<string, any>, options?: Record<string, any>): Promise<Question> {
    return new Promise(async (resolve, reject) => {
      try {
        const attributes = attribute || this.defaultAttributes;

        const question = await Models.Questions.findOne({
          attributes,
          where,
          raw: true,
          ...options,
        });

        resolve(question);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Save one question
   * @param {Question} payload
   * @param {Record<string, any>} options
   * @returns {Promise<Question>}
   */
  save(payload: Question, options?: Record<string, any>): Promise<Question> {
    return new Promise(async (resolve, reject) => {
      try {
        const question = await Models.Questions.create(
          {
            ...payload,
          },
          {
            returning: true,
            raw: true,
            ...options,
          },
        );

        resolve(question);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update one question
   * @param {Question} payload
   * @param {Question} where
   * @param {Record<string, any>} options
   * @returns {Promise<boolean>}
   */
  update(payload: Question, where?: Question, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const question = await Models.Questions.update(
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

        if (question[0] < 1) {
          resolve(false);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Delete one question
   * @param {Question} where
   * @param {Record<string, any>} options
   * @returns {Promise<boolean>}
   */
  delete(where?: Question, options?: Record<string, any>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const question = await Models.Questions.destroy({
          where,
          ...options,
        });

        if (question[0] < 1) {
          resolve(false);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new QuestionsRepositories();
