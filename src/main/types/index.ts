export type Category = {
  id?: number;
  name?: string;
  descriptions?: string;
  created_at?: string;
  updated_at?: string;
};

export type SubCategory = {
  id?: number;
  name?: string;
  descriptions?: string;
  created_at?: string;
  updated_at?: string;
};

export enum QuestionAnswer {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'D',
}

export type Question = {
  [x: string]: any;
  id?: number;
  question?: string;
  answer_a?: string;
  answer_b?: string;
  answer_c?: string;
  answer_d?: string;
  correct_answer_pg?: QuestionAnswer;
  correct_answer_essay?: string;
  category_id?: number;
  sub_category_id?: number;
  created_at?: string;
  updated_at?: string;
};
