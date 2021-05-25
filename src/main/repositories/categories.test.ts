import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import CategoriesRepository from './categories';
import { Category } from '../types';

const Models = require('../models/index.js');

describe('CategoriesRepository', () => {
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
      const stub = sinon.stub(Models.Categories, 'findAll').returns(stubValues);
      const categories = await CategoriesRepository.get({});
      expect(stub.calledOnce).to.be.true;
      categories.forEach((category: Category, index: number) => {
        expect(category.id).to.equal(stubValues[index].id);
        expect(category.name).to.equal(stubValues[index].name);
        expect(category.description).to.equal(stubValues[index].description);
        expect(category.created_at).to.equal(stubValues[index].created_at);
        expect(category.updated_at).to.equal(stubValues[index].updated_at);
      });
    });
  });

  describe('getOne', () => {
    it('should get all categories from the db', async () => {
      const stub = sinon.stub(Models.Categories, 'findOne').returns(stubValue);
      const category = await CategoriesRepository.getOne({
        id: stubValue.id,
      });
      expect(stub.calledOnce).to.be.true;
      expect(category.id).to.equal(stubValue.id);
      expect(category.name).to.equal(stubValue.name);
      expect(category.description).to.equal(stubValue.description);
      expect(category.created_at).to.equal(stubValue.created_at);
      expect(category.updated_at).to.equal(stubValue.updated_at);
    });
  });

  describe('save', () => {
    it('should add new category to the db', async () => {
      const stub = sinon.stub(Models.Categories, 'create').returns(stubValue);
      const category = await CategoriesRepository.save(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(category.id).to.equal(stubValue.id);
      expect(category.name).to.equal(stubValue.name);
      expect(category.description).to.equal(stubValue.description);
      expect(category.created_at).to.equal(stubValue.created_at);
      expect(category.updated_at).to.equal(stubValue.updated_at);
    });
  });

  describe('update', () => {
    it('should update one category from the db', async () => {
      const stub = sinon.stub(Models.Categories, 'update').returns([1]);
      const category = await CategoriesRepository.update(stubValue, {
        id: stubValue.id,
      });
      expect(stub.calledOnce).to.be.true;
      expect(category).to.be.true;
    });
  });

  describe('delete', () => {
    it('should delete one category from the db', async () => {
      const stub = sinon.stub(Models.Categories, 'destroy').returns([1]);
      const category = await CategoriesRepository.delete(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(category).to.be.true;
    });
  });
});
