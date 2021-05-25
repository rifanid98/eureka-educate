/** Local Libraries */
import Joi from 'joi';
import { IResponse, Response as Resp } from '../utils/helpers/response';
import { Question } from '../types';

/** Repositories */
import QuestionsRepository from '../repositories/questions';
import CategoriesRepository from '../repositories/categories';
import SubCategoriesRepository from '../repositories/subcategories';
import Helpers from '../utils/helpers/helpers';
import Schemas from '../schemas/questions';

class CategpriesServices {
  /**
   * Get
   * @returns {Promise<IResponse>}
   */
  async get(): Promise<IResponse> {
    try {
      const data = await QuestionsRepository.get({});
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
      const data = await QuestionsRepository.getOne({
        id,
      });

      if (!data) {
        return Resp.notfound(`Questions data with id ${id} not found`);
      }

      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | getById()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {Question} payload
   * @returns {Promise<IResponse>}
   */
  async post(payload: Question): Promise<IResponse> {
    try {
      let double = 0;

      if (payload.correct_answer_essay) {
        double += 1;
      }

      if (payload.correct_answer_pg) {
        double += 1;

        if (!payload.answer_a || !payload.answer_b || !payload.answer_c || !payload.answer_d) {
          return Resp.badrequest('Answer A, B, C and D must be filled');
        }
      }

      if (double >= 2) {
        return Resp.badrequest(
          'cannot insert correct_answer_essay and correct_answer_pg simultaneously, please choose one of them.',
        );
      }

      const category = await CategoriesRepository.getOne(
        {
          id: payload.category_id,
        },
        ['id'],
      );

      if (!category) {
        return Resp.notfound(`Category data with id ${payload.category_id} is not found`);
      }

      const subCategory = await SubCategoriesRepository.getOne(
        {
          id: payload.sub_category_id,
        },
        ['id'],
      );

      if (!subCategory) {
        return Resp.notfound(`SubCategory data with id ${payload.sub_category_id} is not found`);
      }

      const question = await QuestionsRepository.getOne(
        {
          question: payload.question,
        },
        ['id'],
      );

      if (question) {
        return Resp.conflict(`Question '${payload.question}' already exists`);
      }

      const data = await QuestionsRepository.save(payload);
      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | post()`);
      return Resp.error();
    }
  }

  /**
   * Post one data
   * @param {Question} payload
   * @returns {Promise<IResponse>}
   */
  async patch(payload: Question): Promise<IResponse> {
    try {
      const question: Question = await QuestionsRepository.getOne({
        id: payload.id,
      });

      if (!question) {
        return Resp.notfound(`question data with id ${payload.id} is not found`);
      }

      delete question.created_at;
      delete question.updated_at;

      const questionKeys = Object.keys(question);

      const schema: Record<string, Joi.AnySchema> = {};

      // Check, any column that has its contents
      questionKeys.forEach((item: string) => {
        if (question[item] && question[item] !== null && question[item].toString().length > 0) {
          schema[item] = Schemas.patch[item];
        }
      });

      type ValidationResult = {
        invalid: boolean;
        result: IResponse;
      };

      const { invalid, result }: ValidationResult = await Helpers.validateBody(schema, payload);
      if (invalid) return result;

      const data = await QuestionsRepository.update(payload, {
        id: question.id,
      });

      return Resp.success({ data });
    } catch (error) {
      console.log(error, `<<< ${__filename} | patch()`);
      return Resp.error();
    }
  }

  /**
   * Delete one data
   * @param {Question} payload
   * @returns {Promise<IResponse>}
   */
  async delete(payload: Question): Promise<IResponse> {
    try {
      const question = await QuestionsRepository.getOne({
        id: payload.id,
      });

      if (!question) {
        return Resp.notfound(`Question data with id '${payload.id}' was not found`);
      }

      const data = await QuestionsRepository.delete(payload);

      if (!data) {
        return Resp.error(`Data question with id ${payload.id} failed to be deleted`);
      }

      return Resp.success({ message: 'Question data deleted successfully' });
    } catch (error) {
      console.log(error, `<<< ${__filename} | delete()`);
      return Resp.error();
    }
  }
}

export default new CategpriesServices();
