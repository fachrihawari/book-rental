import { Loan } from './loan';
import { Book } from './book';
import { ApiProperty } from '@nestjs/swagger';

export class LoanDetailRelations {
  @ApiProperty({ type: () => Loan })
  loan: Loan;

  @ApiProperty({ type: () => Book })
  book: Book;
}
