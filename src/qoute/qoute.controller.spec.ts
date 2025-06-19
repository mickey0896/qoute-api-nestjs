import { Test, TestingModule } from '@nestjs/testing';
import { QouteController } from './qoute.controller';
import { QouteService } from './qoute.service';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Qoute } from './schemas/qoute.schema';

describe('QouteController', () => {
  let controller: QouteController;

  const mockUserService = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockQouteModel = {
    find: jest.fn().mockReturnThis(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    new: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QouteController],
      providers: [
        QouteService,
        { provide: UserService, useValue: mockUserService },
        { provide: getModelToken(Qoute.name), useValue: mockQouteModel },
      ],
    }).compile();

    controller = module.get<QouteController>(QouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
