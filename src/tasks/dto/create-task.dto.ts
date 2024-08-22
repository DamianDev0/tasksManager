import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../enum/status.enum';
import { Priority } from '../enum/priority.enum';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsString()
  @IsEnum(Priority)
  priority: Priority;

  @IsString()
  category: string;

  @IsString()
  dueDate: string;

  @IsEmail()
  @IsOptional()
  assigneeEmail?: string;
}
