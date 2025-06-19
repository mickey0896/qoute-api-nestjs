import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateQouteDto {
  @IsNotEmpty()
  @IsString()
  readonly qoute: string;
}
