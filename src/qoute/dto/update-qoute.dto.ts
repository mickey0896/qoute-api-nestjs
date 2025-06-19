import { IsOptional, IsString } from 'class-validator';

export class UpdateQouteDto {
  @IsOptional()
  @IsString()
  readonly qoute?: string;
}
