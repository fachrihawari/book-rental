import { LoanDetail } from './loan_detail';
import { Wishlist } from './wishlist';
import { ApiProperty } from '@nestjs/swagger';

export class BookRelations {
  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetail[];

  @ApiProperty({ isArray: true, type: () => Wishlist })
  wishlists: Wishlist[];
}
