import { User } from './user';
import { LoanDetail } from './loan_detail';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user_type';
import { LoanDetailType } from './loandetail_type';

export class LoanRelations {
  @ApiProperty({ type: () => User })
  user: UserType;

  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetailType[];
}
