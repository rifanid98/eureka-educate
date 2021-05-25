import { SchemaMap } from 'joi';

export type ResponseData = {
  message?: string | any[] | Record<string, any>;
  valid?: boolean;
  invalid?: boolean;
};

export type Field = string[];

export type Schema = {
  [key: string]: any;
};

export type Body = SchemaMap;

export type Validation = {
  invalid: boolean;
  message: string;
};

export type Object = {
  [key: string]: any;
};
