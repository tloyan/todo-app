import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['OPEN', 'DONE'])
  status: 'OPEN' | 'DONE';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
