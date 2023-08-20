import { IsNumberString } from 'class-validator';

export class DeleteOneParams {

  @IsNumberString()
  id: number;

}