import chai, { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import SubCategoriesRepository from './subcategories';
import { SubCategory } from '../types';

const Models = require('../models/index.js');

describe('SubCategoriesRepository', () => {
  const stubValue: SubCategory = {
    id: faker.datatype.number(1),
    name: faker.name.findName(),
    description: faker.name.findName(),
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
  };

  const stubValues: SubCategory[] = [
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
    it('should get all subCategories from the db', async () => {
      const stub = sinon.stub(Models.SubCategories, 'findAll').returns(stubValues);
      const subCategories = await SubCategoriesRepository.get({});
      expect(stub.calledOnce).to.be.true;
      subCategories.forEach((subCategory: SubCategory, index: number) => {
        expect(subCategory.id).to.equal(stubValues[index].id);
        expect(subCategory.name).to.equal(stubValues[index].name);
        expect(subCategory.description).to.equal(stubValues[index].description);
        expect(subCategory.created_at).to.equal(stubValues[index].created_at);
        expect(subCategory.updated_at).to.equal(stubValues[index].updated_at);
      });
    });
  });

  describe('getOne', () => {
    it('should get all subCategories from the db', async () => {
      const stub = sinon.stub(Models.SubCategories, 'findOne').returns(stubValue);
      const subCategory = await SubCategoriesRepository.getOne({
        id: stubValue.id,
      });
      expect(stub.calledOnce).to.be.true;
      expect(subCategory.id).to.equal(stubValue.id);
      expect(subCategory.name).to.equal(stubValue.name);
      expect(subCategory.description).to.equal(stubValue.description);
      expect(subCategory.created_at).to.equal(stubValue.created_at);
      expect(subCategory.updated_at).to.equal(stubValue.updated_at);
    });
  });

  describe('save', () => {
    it('should add new subCategory to the db', async () => {
      const stub = sinon.stub(Models.SubCategories, 'create').returns(stubValue);
      const subCategory = await SubCategoriesRepository.save(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(subCategory.id).to.equal(stubValue.id);
      expect(subCategory.name).to.equal(stubValue.name);
      expect(subCategory.description).to.equal(stubValue.description);
      expect(subCategory.created_at).to.equal(stubValue.created_at);
      expect(subCategory.updated_at).to.equal(stubValue.updated_at);
    });
  });

  describe('update', () => {
    it('should update one subCategory from the db', async () => {
      const stub = sinon.stub(Models.SubCategories, 'update').returns([1]);
      const subCategory = await SubCategoriesRepository.update(stubValue, {
        id: stubValue.id,
      });
      expect(stub.calledOnce).to.be.true;
      expect(subCategory).to.be.true;
    });
  });

  describe('delete', () => {
    it('should delete one subCategory from the db', async () => {
      const stub = sinon.stub(Models.SubCategories, 'destroy').returns([1]);
      const subCategory = await SubCategoriesRepository.delete(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(subCategory).to.be.true;
    });
  });
});
