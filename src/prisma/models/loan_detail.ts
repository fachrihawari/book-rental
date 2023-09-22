import { Loan } from './loan';
import { Book } from './book';
import { ApiProperty } from '@nestjs/swagger';

export class LoanDetail {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  loanId: number;

  @ApiProperty({ type: Number })
  bookId: number;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  loanFee: number;

  @ApiProperty({ type: () => Loan })
  loan: Loan;

  @ApiProperty({ type: () => Book })
  book: Book;
}
