import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGroupsService } from './default-groups.service';

describe('DefaultGroupsService', () => {
  let service: DefaultGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultGroupsService],
    }).compile();

    service = module.get<DefaultGroupsService>(DefaultGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
