import { LoanDetail } from './loan_detail';
import { ApiProperty } from '@nestjs/swagger';

export class BookRelations {
  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetail[];
}
