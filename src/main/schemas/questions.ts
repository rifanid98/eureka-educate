import Joi from 'joi';

/**
 * Create your own joi schema here.
 * Don't use Joi.object here! use plain object instead
 *
 * import this schemas to your controller
 * or models to start validate the data.
 *
 * import FormValidation from 'path/to/utils/FormValidation.js';
 * import {loginSchema} from 'path/to/this/file/js';
 *
 * const body = req.body;
 * // or
 * const body = {
 *      username: 'root',
 *      password: 'root'
 * }
 * const fieldToPatch = Object.keys(body);
 * const valid = new FormValidation(loginSchema, body)                  // static validation
 * const valid = new FormValidation(loginSchema, body, fieldToPatch)    // dynamic validation
 *
 */
class Schemas {
  static id = {
    id: Joi.number().min(1).required(),
  };

  static post = {
    question: Joi.string().trim().required(),
    answer_a: Joi.string().trim().required(),
    answer_b: Joi.string().trim().required(),
    answer_c: Joi.string().trim().required(),
    answer_d: Joi.string().trim().required(),
    correct_answer_pg: Joi.string().trim().valid('a', 'b', 'c', 'd').required(),
    correct_answer_essay: Joi.string().trim().required(),
    category_id: Joi.number().min(1).required(),
    sub_category_id: Joi.number().min(1).required(),
  };

  static patch: Record<string, Joi.AnySchema> = {
    id: Joi.number().min(1).required(),
    question: Joi.string().trim().required(),
    answer_a: Joi.string().trim().required(),
    answer_b: Joi.string().trim().required(),
    answer_c: Joi.string().trim().required(),
    answer_d: Joi.string().trim().required(),
    correct_answer_pg: Joi.string().trim().valid('a', 'b', 'c', 'd').required(),
    correct_answer_essay: Joi.string().trim().required(),
    category_id: Joi.number().min(1).required(),
    sub_category_id: Joi.number().min(1).required(),
  };
}

export default Schemas;
