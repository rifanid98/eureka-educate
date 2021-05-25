import { SchemaMap } from 'joi';
import FormValidation from './FormValidation';
import { Response } from './Response';
import { Body, ResponseData } from './types';

class Helpers {
  /**
   * Validate payload body
   *
   * @param {{}}} schema
   * @param {{}} body
   */
  static async validateBody(schema: SchemaMap, body: Body, fieldsToPatch?: string[]): Promise<any> {
    if (fieldsToPatch) {
      return this.validateBodyPartial(schema, body, fieldsToPatch);
    }
    return this.validateBodyFull(schema, body);
  }

  /**
   * Validate payload body
   *
   * @param {{}}} schema
   * @param {{}} body
   */
  protected static validateBodyPartial(schema: SchemaMap, body: Body, fieldsToPatch: string[]): Promise<any> {
    return new Promise(async (resolve) => {
      const formValidation = new FormValidation(schema, body, fieldsToPatch);
      const validation: ResponseData = await formValidation.dynamic();
      if (validation.invalid) {
        const { message } = validation;
        resolve({
          invalid: true,
          result: Response.badrequest(message),
        });
      }
      resolve(true);
    });
  }

  /**
   * Validate payload body
   *
   * @param {{}}} schema
   * @param {{}} body
   */
  protected static async validateBodyFull(schema: SchemaMap, body: Body): Promise<any> {
    return new Promise(async (resolve) => {
      const formValidation = new FormValidation(schema, body);
      const validation: ResponseData = await formValidation.static();
      if (validation.invalid) {
        const { message } = validation;
        resolve({
          invalid: true,
          result: Response.badrequest(message),
        });
      }
      resolve(true);
    });
  }
}

export default Helpers;
