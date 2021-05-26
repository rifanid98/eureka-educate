import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import CategoriesService from './categories';
import CategoriesRepository from '../repositories/categories';
import { Category } from '../types';

describe('CategoriesService', () => {
  const stubValue: Category = {
    id: faker.datatype.number(1),
    name: faker.name.findName(),
    description: faker.name.findName(),
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
  };

  const stubValues: Category[] = [
    {
      id: faker.datatype.number(1),
      name: faker.name.findName(),
      description: faker.name.findName(),
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
    },
    {
      id: faker.datatype.number(1),
      name: faker.name.findName(),
      description: faker.name.findName(),
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
    },
  ];

  describe('get', () => {
    it('should get all categories from the db', async () => {
      const stub = sinon.stub(CategoriesRepository, 'get').resolves(stubValues);
      const category = await CategoriesService.get();
      expect(stub.calledOnce).to.be.true;
      expect(category.status).to.be.equal(200);
      expect(category.message).to.be.equal("Success");
      expect(category.data).to.be.equal(stubValues);
    });
  });

  describe('getById', () => {
    it('should get all categories from the db', async () => {
      const stub = sinon.stub(CategoriesRepository, 'getOne').resolves(stubValue);
      const category = await CategoriesService.getById(stubValue.id!);
      expect(stub.calledOnce).to.be.true;
      expect(category.status).to.be.equal(200);
      expect(category.message).to.be.equal("Success");
      expect(category.data).to.be.equal(stubValue);
      stub.restore();
    });
  });

  describe('post', () => {
    it('should add new category to the db', async () => {
      const stubGetOne = sinon.stub(CategoriesRepository, 'getOne').resolves();
      const stubSave = sinon.stub(CategoriesRepository, 'save').resolves(stubValue);
      const category = await CategoriesService.post(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(category.status).to.be.equal(200);
      expect(category.message).to.be.equal("Success");
      expect(category.data).to.be.equal(stubValue);
      stubGetOne.restore();
    });
  });

  describe('patch', () => {
    it('should update one category from the db', async () => {
      const stubGetOne = sinon.stub(CategoriesRepository, 'getOne').resolves(stubValue);
      const stubSave = sinon.stub(CategoriesRepository, 'update').resolves(true);
      const category = await CategoriesService.patch(stubValue);
      expect(stubGetOne.calledTwice).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(category.status).to.be.equal(200);
      expect(category.message).to.be.equal("Success");
      expect(category.data).to.be.equal(stubValue);
      stubGetOne.restore();
    });
  });

  describe('delete', () => {
    it('should delete one category from the db', async () => {
      const stubGetOne = sinon.stub(CategoriesRepository, 'getOne').resolves(stubValue);
      const stubSave = sinon.stub(CategoriesRepository, 'delete').resolves(true);
      const category = await CategoriesService.delete(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(category.status).to.be.equal(200);
      expect(category.message).to.be.includes("success");
      expect(category).not.to.be.have.property("data");
      stubGetOne.restore();
    });
  });
});
