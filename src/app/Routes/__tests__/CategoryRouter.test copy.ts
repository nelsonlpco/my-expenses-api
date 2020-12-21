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

    const findSpy = jest.fn().mockResolvedValue(resultStub);
    const insertOneSpy = jest.fn().mockResolvedValue({result: { ok: true}});
    const collectionStub = jest.fn()
    .mockImplementation(() => ({
      find: findSpy,
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
});
