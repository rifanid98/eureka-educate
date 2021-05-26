import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import SubCategoriesService from './subcategories';
import SubCategoriesRepository from '../repositories/subcategories';
import { SubCategory } from '../types';

describe('SubCategoriesService', () => {
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
      const stub = sinon.stub(SubCategoriesRepository, 'get').resolves(stubValues);
      const subCategory = await SubCategoriesService.get();
      expect(stub.calledOnce).to.be.true;
      expect(subCategory.status).to.be.equal(200);
      expect(subCategory.message).to.be.equal("Success");
      expect(subCategory.data).to.be.equal(stubValues);
    });
  });

  describe('getById', () => {
    it('should get all subCategories from the db', async () => {
      const stub = sinon.stub(SubCategoriesRepository, 'getOne').resolves(stubValue);
      const subCategory = await SubCategoriesService.getById(stubValue.id!);
      expect(stub.calledOnce).to.be.true;
      expect(subCategory.status).to.be.equal(200);
      expect(subCategory.message).to.be.equal("Success");
      expect(subCategory.data).to.be.equal(stubValue);
      stub.restore();
    });
  });

  describe('post', () => {
    it('should add new subCategory to the db', async () => {
      const stubGetOne = sinon.stub(SubCategoriesRepository, 'getOne').resolves();
      const stubSave = sinon.stub(SubCategoriesRepository, 'save').resolves(stubValue);
      const subCategory = await SubCategoriesService.post(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(subCategory.status).to.be.equal(200);
      expect(subCategory.message).to.be.equal("Success");
      expect(subCategory.data).to.be.equal(stubValue);
      stubGetOne.restore();
    });
  });

  describe('patch', () => {
    it('should update one subCategory from the db', async () => {
      const stubGetOne = sinon.stub(SubCategoriesRepository, 'getOne').resolves(stubValue);
      const stubSave = sinon.stub(SubCategoriesRepository, 'update').resolves(true);
      const subCategory = await SubCategoriesService.patch(stubValue);
      expect(stubGetOne.calledTwice).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(subCategory.status).to.be.equal(200);
      expect(subCategory.message).to.be.equal("Success");
      expect(subCategory.data).to.be.equal(stubValue);
      stubGetOne.restore();
    });
  });

  describe('delete', () => {
    it('should delete one subCategory from the db', async () => {
      const stubGetOne = sinon.stub(SubCategoriesRepository, 'getOne').resolves(stubValue);
      const stubSave = sinon.stub(SubCategoriesRepository, 'delete').resolves(true);
      const subCategory = await SubCategoriesService.delete(stubValue);
      expect(stubGetOne.calledOnce).to.be.true;
      expect(stubSave.calledOnce).to.be.true;
      expect(subCategory.status).to.be.equal(200);
      expect(subCategory.message).to.be.includes("success");
      expect(subCategory).not.to.be.have.property("data");
      stubGetOne.restore();
    });
  });
});
