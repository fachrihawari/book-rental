import { Loan } from './loan';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Loan })
  loans: Loan[];
}
