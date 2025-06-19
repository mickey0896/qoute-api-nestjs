import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQouteDto } from './dto/create-qoute.dto';
import { UpdateQouteDto } from './dto/update-qoute.dto';
import { Qoute, QouteDocument } from './schemas/qoute.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class QouteService {
  constructor(
    private userService: UserService,
    @InjectModel(Qoute.name) private qouteModel: Model<QouteDocument>,
  ) {}

  async create(createQouteDto: CreateQouteDto) {
    try {
      const data = {
        ...createQouteDto,
        vote: 0,
      };
      const result = await new this.qouteModel(data).save();
      return {
        message: 'Create successful!!',
        data: result,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('This quote already exists');
      }
      throw error;
    }
  }

  async findAll(query: any) {
    const filter: any = {};
    const sort: any = {};
    if (query.search) {
      filter.qoute = { $regex: query.search, $options: 'i' };
    }
    if (query.vote !== undefined) {
      filter.vote = Number(query.vote);
    }
    if (query.sortBy) {
      const direction = query.sortDirection === 'asc' ? 1 : -1;
      sort[query.sortBy] = direction;
    }

    return this.qouteModel.find(filter).sort(sort).exec();
  }

  async findOne(id: string): Promise<Qoute> {
    const qoute = await this.qouteModel.findById(id).exec();

    if (!qoute) {
      throw new NotFoundException('Qoute not found');
    }
    return qoute;
  }

  async update(id: string, updateQouteDto: UpdateQouteDto) {
    const result = await this.qouteModel
      .findByIdAndUpdate(id, updateQouteDto, {
        new: true,
      })
      .exec();

    if (!result) {
      throw new NotFoundException(`Qoute with id ${id} not found`);
    }

    return {
      message: 'Update successful!!',
      data: result,
    };
  }

  async vote(id: string, _id: string) {
    const user = await this.userService.findById(_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.is_vote) {
      throw new BadRequestException('User has already voted');
    }

    const quote = await this.qouteModel.findById(id).exec();
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    if (quote.vote >= 1) {
      throw new BadRequestException('Cannot vote anymore');
    }
    
    quote.vote = 1;
    await quote.save();

    user.is_vote = true;
    await this.userService.update(_id, { is_vote: true });

    return {
      message: 'Vote successful!!',
      data: quote,
    };
  }

  async remove(id: string) {
    const result = await this.qouteModel.findByIdAndDelete(id).exec();
    return {
      message: 'Remove successful!!',
      data: result,
    };
  }
}
