import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import QuestionsService from './questions';
import QuestionsRepository from '../repositories/questions';
import { Question, QuestionAnswer } from '../types';

describe('QuestionsService', () => {
  const pg = ['A', 'B', 'C', 'D'];
  const randomAnswer = pg[Math.ceil(Math.random() * 4) - 1];
  const answer = pg.findIndex((q) => randomAnswer);

  const stubValue: Question = {
    id: 1,
    question: faker.name.findName(),
    answer_a: faker.name.findName(),
    answer_b: faker.name.findName(),
    answer_c: faker.name.findName(),
    answer_d: faker.name.findName(),
    correct_answer_pg: Object.values(QuestionAnswer)[answer],
    correct_answer_essay: null,
    category_id: 1,
    sub_category_id: 1,
    created_at: "2021-05-25T11:47:19.990Z",
    updated_at: "2021-05-25T11:47:19.990Z"
  };

  const stubValues: Question[] = [
    {
      id: 1,
      question: faker.name.findName(),
      answer_a: faker.name.findName(),
      answer_b: faker.name.findName(),
      answer_c: faker.name.findName(),
      answer_d: faker.name.findName(),
      correct_answer_pg: Object.values(QuestionAnswer)[answer],
      correct_answer_essay: null,
      category_id: 1,
      sub_category_id: 1,
      created_at: "2021-05-25T11:47:19.990Z",
      updated_at: "2021-05-25T11:47:19.990Z"
    },
    {
      id: 1,
      question: faker.name.findName(),
      answer_a: faker.name.findName(),
      answer_b: faker.name.findName(),
      answer_c: faker.name.findName(),
      answer_d: faker.name.findName(),
      correct_answer_pg: Object.values(QuestionAnswer)[answer],
      correct_answer_essay: null,
      category_id: 1,
      sub_category_id: 1,
      created_at: "2021-05-25T11:47:19.990Z",
      updated_at: "2021-05-25T11:47:19.990Z"
    },
  ];

  describe('get', () => {
    it('should get all questions from the db', async () => {
      const stub = sinon.stub(QuestionsRepository, 'get').resolves(stubValues);
      const question = await QuestionsService.get();
      expect(stub.calledOnce).to.be.true;
      expect(question.status).to.be.equal(200);
      expect(question.message).to.be.equal("Success");
      expect(question.data).to.be.equal(stubValues);
      stub.restore();
    });
  });

  describe('getById', () => {
    it('should get all questions from the db', async () => {
      const stub = sinon.stub(QuestionsRepository, 'getOne').resolves(stubValue);
      const question = await QuestionsService.getById(stubValue.id!);
      expect(stub.calledOnce).to.be.true;
      expect(question.status).to.be.equal(200);
      expect(question.message).to.be.equal("Success");
      expect(question.data).to.be.equal(stubValue);
      stub.restore();
    });
  });

  describe('post', () => {
    it('should add new question to the db', async () => {
      const stubGetOne = sinon.stub(QuestionsRepository, 'getOne').resolves();
      const stubSave = sinon.stub(QuestionsRepository, 'save').resolves(stubValue);
      const question = await QuestionsService.post(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(question.status).to.be.equal(200);
      expect(question.message).to.be.equal("Success");
      expect(question.data).to.be.equal(stubValue);
      stubGetOne.restore();
      stubSave.restore();
    });
  });

  describe('patch', () => {
    it('should update one question from the db', async () => {
      let tempStubValue1 = {...stubValue};
      tempStubValue1.correct_answer_essay = null;
      let tempStubValue2 = {...stubValue};
      delete tempStubValue2.correct_answer_essay;
      delete tempStubValue2.created_at;
      delete tempStubValue2.updated_at;
      const stubGetOne = sinon.stub(QuestionsRepository, 'getOne').resolves(tempStubValue1);
      const stubUpdate = sinon.stub(QuestionsRepository, 'update').resolves(true);
      const question = await QuestionsService.patch(tempStubValue2);
      expect(stubGetOne.calledTwice).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(question.status).to.be.equal(200);
      expect(question.message).to.be.equal("Success");
      expect(question.data).to.be.equal(tempStubValue1);
      stubGetOne.restore();
      stubUpdate.restore();
    });
  });

  describe('delete', () => {
    it('should delete one question from the db', async () => {
      const stubGetOne = sinon.stub(QuestionsRepository, 'getOne').resolves({id : stubValue.id});
      const stubDelete = sinon.stub(QuestionsRepository, 'delete').resolves(true);
      const question = await QuestionsService.delete(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(question.status).to.be.equal(200);
      expect(question.message).to.be.includes("success");
      expect(question).not.to.be.have.property("data");
      stubGetOne.restore();
      stubDelete.restore();
    });
  });
});
