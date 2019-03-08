import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGoalsController } from './default-goals.controller';

describe('DefaultGoals Controller', () => {
  let controller: DefaultGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultGoalsController],
    }).compile();

    controller = module.get<DefaultGoalsController>(DefaultGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
