import CategoryDTO from 'src/domain/dtos/category/CategoryDTO';
import CreateCategoryDTO from 'src/domain/dtos/category/createCategoryDTO';
import Category from 'src/domain/entities/Category';
import IDbContext from 'src/infra/interfaces/IDbContext';

import CategoryRouter from '../CategoryRouter';

describe('CategoryRouter', () => {
  test("Devo conseguir cadastrar uma categoria", async () => {
    const categoryMock = new CategoryDTO('Teste');

    const resultStub = {
      toArray: () => [],
    };

    const findStub = jest.fn().mockResolvedValue(resultStub);
    const insertOneSpy = jest.fn().mockResolvedValue({result: { ok: true}});
    const collectionStub = jest.fn()
    .mockImplementation(() => ({
      find: findStub,
      insertOne: insertOneSpy,
    }));

    const dbContextStub: IDbContext =  {
      close: jest.fn(),
      connect: jest.fn(),
      getCollection: collectionStub,
    }

    const router = new CategoryRouter(dbContextStub);

    await router.createCategory(categoryMock)

    expect(insertOneSpy).toBeCalledTimes(1);
  });

  test("Deve receber um erro ao tentar cadastrar uma categoria já existente.", async () => {
    const categoryMock = new CategoryDTO('Teste');

    const resultStub = {
      toArray: () => [categoryMock],
    };

    const findStub = jest.fn().mockResolvedValue(resultStub);
    const insertOneSpy = jest.fn().mockResolvedValue({result: { ok: true}});
    const collectionStub = jest.fn()
    .mockImplementation(() => ({
      find: findStub,
      insertOne: insertOneSpy,
    }));

    const dbContextStub: IDbContext =  {
      close: jest.fn(),
      connect: jest.fn(),
      getCollection: collectionStub,
    }

    const router = new CategoryRouter(dbContextStub);

    const action = router.createCategory(categoryMock);

    expect(action).rejects.toMatch('error');
    expect(insertOneSpy).not.toBeCalled();
  });
});
