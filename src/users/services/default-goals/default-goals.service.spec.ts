import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGoalsService } from './default-goals.service';

describe('DefaultGoalsService', () => {
  let service: DefaultGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultGoalsService],
    }).compile();

    service = module.get<DefaultGoalsService>(DefaultGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
