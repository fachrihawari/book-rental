import { LoanDetail } from './loan_detail';
import { Wishlist } from './wishlist';
import { ApiProperty } from '@nestjs/swagger';
import { LoanDetailType } from './loandetail_type';
import { WishlistType } from './wishlist_type';

export class BookRelations {
  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetailType[];

  @ApiProperty({ isArray: true, type: () => Wishlist })
  wishlists: WishlistType[];
}
