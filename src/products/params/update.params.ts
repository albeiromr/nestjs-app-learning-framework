import { IsNumberString } from 'class-validator';

export class UpdateParams {

  @IsNumberString()
  id: number;

}