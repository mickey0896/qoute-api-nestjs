import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { QouteService } from './qoute.service';
import { CreateQouteDto } from './dto/create-qoute.dto';
import { UpdateQouteDto } from './dto/update-qoute.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { create } from 'domain';

@Controller('qoute')
export class QouteController {
  constructor(private readonly qouteService: QouteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQouteDto: CreateQouteDto) {
    return this.qouteService.create(createQouteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any) {
    return this.qouteService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qouteService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() editQouteDto: UpdateQouteDto) {
    return this.qouteService.update(id, editQouteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/vote/:id')
  async vote(@Param('id') id: string, @Req() req) {
    console.log(req.user,'req.user._id;');
    
    const _id = req.user._id;
    return this.qouteService.vote(id, _id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qouteService.remove(id);
  }
}
