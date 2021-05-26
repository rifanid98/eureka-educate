import { Request } from "express";
import FormValidation from './formvalidation';
import { Response } from './response';
import { Body, ResponseData } from './types';
import multer from "multer";
import path from "path";
import { uuid } from 'uuidv4';
import fs from "fs";

class Helpers {
  static appRoot = "";
  static assetsPath = "/assets"

  static setAppRoot(filepath: string): void {
    this.appRoot = filepath.replace("build", "src");
    this.setImagePath();
  }

  static setImagePath() {
    this.assetsPath = path.join(this.appRoot, this.assetsPath);
  }

  /**
   * Validate payload body
   *
   * @param {{}}} schema
   * @param {{}} body
   */
  static async validateBody(schema: Record<string, any>, body: Body, fieldsToPatch?: string[]): Promise<any> {
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
  protected static async validateBodyPartial(
    schema: Record<string, any>,
    body: Body,
    fieldsToPatch: string[],
  ): Promise<any> {
    return new Promise(async (resolve) => {
      const formValidation = new FormValidation(schema, body, fieldsToPatch);
      const validation: ResponseData = await formValidation.dynamic();
      if (validation.invalid) {
        const message = validation.message;
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
  protected static async validateBodyFull(schema: Record<string, any>, body: Body): Promise<any> {
    return new Promise(async (resolve) => {
      const formValidation = new FormValidation(schema, body);
      const validation: ResponseData = await formValidation.static();
      if (validation.invalid) {
        const message = validation.message;
        resolve({
          invalid: true,
          result: Response.badrequest(message),
        });
      }
      resolve(true);
    });
  }

  /**
   * Delete image
   * @param {Request} _
   * @param {string} file_name 
   */
  static deleteImage(_: Request, file_name = "") {
    const targetFile = `${this.assetsPath}/${file_name}`;
    
    if (fs.existsSync(targetFile)) {
      try {
        fs.unlinkSync(targetFile);
      } catch (error) {
        console.log(error, `${__filename} | Helpers.deleteImage`);
      }
    }
  }
}

/**
 * Multer File Handling
 */
const storage = multer.diskStorage({
  destination: path.join('src/main/assets/'),
  filename: function (_, file, cb) {
      const newName = uuid() + "." + file.mimetype.split("/")[1];
      cb(null, newName);
  }
});

type FileFilterCallback = {
  (error: Error): void;
  (error: null, acceptFile: boolean): void;
}

// set file filter
const fileFilter = function (_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      // reject files
      cb(null, false);
  }
};

// set upload multer
export const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 3
  },
  // fileFilter: fileFilter,
});

export default Helpers;
