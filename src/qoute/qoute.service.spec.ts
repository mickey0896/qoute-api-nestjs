import { Test, TestingModule } from '@nestjs/testing';
import { QouteService } from './qoute.service';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Qoute } from './schemas/qoute.schema';

describe('QouteService', () => {
  let service: QouteService;

  const mockUserService = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockQouteModel = {
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    new: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QouteService,
        { provide: UserService, useValue: mockUserService },
        { provide: getModelToken(Qoute.name), useValue: mockQouteModel },
      ],
    }).compile();

    service = module.get<QouteService>(QouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
