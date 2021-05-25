import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import QuestionsRepository from "./questions";
import { Question, QuestionAnswer } from "../types";

const Models = require("../models/index.js");

describe('QuestionsRepository', () => {
  const pg = ["A", "B", "C", "D"];
  const randomAnswer = pg[Math.ceil(Math.random() * 4) - 1];
  const answer = pg.findIndex(q => randomAnswer);
  
  const stubValue: Question = {
    id: faker.datatype.number(1),
    question: faker.datatype.string(Math.random()*100),
    description: faker.datatype.string(Math.random()*100),
    answer_a: faker.datatype.string(Math.random()*100),
    answer_b: faker.datatype.string(Math.random()*100),
    answer_c: faker.datatype.string(Math.random()*100),
    answer_d: faker.datatype.string(Math.random()*100),
    correct_answer_essay: faker.datatype.string(Math.random()*100),
    correct_answer_pg: Object.values(QuestionAnswer)[answer],
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
  };

  const stubValues: Question[] = [
    {
      id: faker.datatype.number(1),
      question: faker.datatype.string(Math.random()*100),
      description: faker.datatype.string(Math.random()*100),
      answer_a: faker.datatype.string(Math.random()*100),
      answer_b: faker.datatype.string(Math.random()*100),
      answer_c: faker.datatype.string(Math.random()*100),
      answer_d: faker.datatype.string(Math.random()*100),
      correct_answer_essay: faker.datatype.string(Math.random()*100),
      correct_answer_pg: Object.values(QuestionAnswer)[answer],
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
    },
    {
      id: faker.datatype.number(1),
      question: faker.datatype.string(Math.random()*100),
      description: faker.datatype.string(Math.random()*100),
      answer_a: faker.datatype.string(Math.random()*100),
      answer_b: faker.datatype.string(Math.random()*100),
      answer_c: faker.datatype.string(Math.random()*100),
      answer_d: faker.datatype.string(Math.random()*100),
      correct_answer_essay: faker.datatype.string(Math.random()*100),
      correct_answer_pg: Object.values(QuestionAnswer)[answer],
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
    },
  ];

  describe('get', () => {
    it('should get all questions from the db', async () => {
      const stub = sinon.stub(Models.Questions, "findAll").returns(stubValues);
      const questions = await QuestionsRepository.get({})
      expect(stub.calledOnce).to.be.true;
      questions.forEach((question: Question, index: number) => {
        expect(question.id).to.equal(stubValues[index].id);
        expect(question.name).to.equal(stubValues[index].name);
        expect(question.description).to.equal(stubValues[index].description);
        expect(question.created_at).to.equal(stubValues[index].created_at);
        expect(question.updated_at).to.equal(stubValues[index].updated_at);
      })
    });
  });

  describe('getOne', () => {
    it('should get all questions from the db', async () => {
      const stub = sinon.stub(Models.Questions, "findOne").returns(stubValue);
      const question = await QuestionsRepository.getOne({
        id: stubValue.id
      })
      expect(stub.calledOnce).to.be.true;
      expect(question.id).to.equal(stubValue.id);
      expect(question.name).to.equal(stubValue.name);
      expect(question.description).to.equal(stubValue.description);
      expect(question.created_at).to.equal(stubValue.created_at);
      expect(question.updated_at).to.equal(stubValue.updated_at);
    });
  });

  describe('save', () => {
    it('should add new question to the db', async () => {
      const tempStubValue = stubValue;
      tempStubValue.answer_a = null;
      tempStubValue.answer_b = null;
      tempStubValue.answer_c = null;
      tempStubValue.answer_d = null;
      tempStubValue.correct_answer_pg = "aaaaa";
      const stub = sinon.stub(Models.Questions, "create").returns(stubValue);
      const question = await QuestionsRepository.save(tempStubValue);
      expect(stub.calledOnce).to.be.true;
      expect(question.id).to.equal(tempStubValue.id);
      expect(question.name).to.equal(tempStubValue.name);
      expect(question.description).to.equal(tempStubValue.description);
      expect(question.created_at).to.equal(tempStubValue.created_at);
      expect(question.updated_at).to.equal(tempStubValue.updated_at);
    });
  });

  describe('update', () => {
    it('should update one question from the db', async () => {
      const tempStubValue = stubValue;
      tempStubValue.answer_a = null;
      tempStubValue.answer_b = null;
      tempStubValue.answer_c = null;
      tempStubValue.answer_d = null;
      tempStubValue.correct_answer_pg = null;
      const stub = sinon.stub(Models.Questions, "update").returns(tempStubValue);
      const question = await QuestionsRepository.update(tempStubValue);
      expect(stub.calledOnce).to.be.true;
      expect(question).to.be.true;
    });
  });

  describe('delete', () => {
    it('should delete one question from the db', async () => {
      const stub = sinon.stub(Models.Questions, "destroy").returns([1]);
      const question = await QuestionsRepository.delete(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(question).to.be.true;
    });
  });
  
})
