export type Category = {
  id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type SubCategory = {
  id?: number;
  name?: string;
  description?: string;
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
  answer_a?: string | null;
  answer_b?: string | null;
  answer_c?: string | null;
  answer_d?: string | null;
  correct_answer_pg?: string | QuestionAnswer | null;
  correct_answer_essay?: string | null;
  category_id?: number;
  sub_category_id?: number;
  created_at?: string;
  updated_at?: string | null;
};
