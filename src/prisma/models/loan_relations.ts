import { User } from './user';
import { LoanDetail } from './loan_detail';
import { ApiProperty } from '@nestjs/swagger';

export class LoanRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetail[];
}
