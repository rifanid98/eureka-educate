import Joi, { SchemaMap } from 'joi';
import _ from 'lodash';
import { ResponseData, Field, Body } from './types';

/**
 * Custom Joi Error Handling
 *
 * @param {string} error
 * @returns {string}
 */
function joiError(error = '') {
  if (error) {
    return error.split(': ').pop();
  }

  return error;
}

/**
 * Template response, agar bisa menerapkan named argument di javascript
 *
 * @param {object} data
 * @returns {object}
 */
function response(data: ResponseData) {
  const tempData = data;
  tempData.valid = data.valid ? data.valid : false;
  tempData.invalid = data.invalid ? data.invalid : false;
  tempData.message = data.message ? data.message : '';

  return tempData;
}

class FormValidation {
  private field?: Field;

  private fields: Body;

  private schema: SchemaMap;

  constructor(schema: SchemaMap, fields: Body, field?: Field) {
    this.field = field;
    this.fields = fields;
    this.schema = schema;
  }

  /**
   * Validate whether the sent payload data
   * is the same as the predetermined scheme
   */
  validate(): ResponseData {
    let schemaKeys: string[] = [];
    const fieldsKeys: string[] = Object.keys(this.fields).sort();

    if (this.field) {
      const tempKeys: SchemaMap = {};
      this.field.forEach((item: string) => {
        if (item in this.schema) {
          tempKeys[item] = this.schema[item];
        }
      });
      schemaKeys = Object.keys(tempKeys).sort();
    } else {
      schemaKeys = Object.keys(this.schema).sort();
    }

    schemaKeys.sort();
    fieldsKeys.sort();

    const isSchemaMatch: boolean = _.isEqual(schemaKeys, fieldsKeys);

    if (!isSchemaMatch) {
      const notRequired: string[] = [];
      const missing: string[] = [];

      schemaKeys.forEach((schemaKey) => {
        const isFieldMatch = fieldsKeys.findIndex((fieldsKey) => fieldsKey === schemaKey);
        if (isFieldMatch < 0) {
          missing.push(schemaKey);
        }
      });

      fieldsKeys.forEach((schemaKey) => {
        const isFieldMatch = schemaKeys.findIndex((fieldsKey) => fieldsKey === schemaKey);
        if (isFieldMatch < 0) {
          notRequired.push(schemaKey);
        }
      });

      return response({
        invalid: true,
        message: {
          info: `Field does not match!`,
          missing,
          not_required: notRequired,
          required: schemaKeys,
          given: fieldsKeys,
        },
      });
    }

    return response({ valid: true });
  }

  /**
   * Use this code to validate full of fields you created
   *
   * const valid = await new FormValidation(loginSchema, body);
   * if (valid) // your code
   */
  async static(): Promise<ResponseData> {
    const validation = this.validate();
    if (validation.invalid) return response(validation);

    const errors: any[] = [];

    const schemas: string[] = Object.keys(this.schema);
    const fields: string[] = Object.keys(this.fields);

    schemas.sort();
    fields.sort();

    for (let i = 0; i < schemas.length; i += 1) {
      const schema: SchemaMap = { [schemas[i]]: this.schema[schemas[i]] };
      const field: SchemaMap = { [fields[i]]: this.fields[fields[i]] };

      const validate: Promise<any> = Joi.object(schema).validateAsync(field);

      const check: ResponseData = await validate
        .then(() => {
          return response({
            valid: true,
          });
        })
        .catch((error) => {
          return response({
            invalid: true,
            message: joiError(error.toString()),
          });
        });

      if (check.invalid) {
        errors.push(check.message);
      }
    }

    if (errors.length > 0) {
      return response({ invalid: true, message: errors });
    }

    const validate = Joi.object(this.schema).validateAsync(this.fields);
    return validate
      .then(() => {
        return response({ valid: true });
      })
      .catch((error) => {
        return response({
          invalid: true,
          message: joiError(error.toString()),
        });
      });
  }

  /**
   * Use this code to dynamic validation of your custom fields.
   * Use this code to validate some of fields.
   *
   * const body = req.body;
   * const fieldToPatch = Object.keys(body);
   *
   * const valid = await new FormValidation(loginSchema, body, fieldToPatch);
   * if (valid) //your code
   */
  dynamic(): Promise<ResponseData> {
    const validation = this.validate();
    if (validation.invalid) return Promise.resolve(response(validation));

    const dynamicSchema = Object.keys(this.schema)
      .filter((key) => this.field?.includes(key))
      .reduce((obj: SchemaMap, key) => {
        const tempObj = obj;
        tempObj[key] = this.schema[key];
        return tempObj;
      }, {});

    const validate = Joi.object(dynamicSchema).validateAsync(this.fields);

    return validate
      .then(() => {
        return response({ valid: true });
      })
      .catch((error) => {
        return response({ invalid: true, message: joiError(error.toString()) });
      });
  }
}

export default FormValidation;
