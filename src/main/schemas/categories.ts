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
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
  };

  static patch = {
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
  };
}

export default Schemas;
