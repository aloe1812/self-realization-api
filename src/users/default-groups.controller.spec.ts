import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGroupsController } from './default-groups.controller';

describe('DefaultGroups Controller', () => {
  let controller: DefaultGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultGroupsController],
    }).compile();

    controller = module.get<DefaultGroupsController>(DefaultGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
