import { Loan } from './loan';
import { Book } from './book';
import { ApiProperty } from '@nestjs/swagger';
import { LoanType } from './loan_type';
import { BookType } from './book_type';

export class LoanDetailRelations {
  @ApiProperty({ type: () => Loan })
  loan: LoanType;

  @ApiProperty({ type: () => Book })
  book: BookType;
}
