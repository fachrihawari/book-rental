import { Loan } from './loan';
import { Wishlist } from './wishlist';
import { ApiProperty } from '@nestjs/swagger';
import { LoanType } from './loan_type';
import { WishlistType } from './wishlist_type';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Loan })
  loans: LoanType[];

  @ApiProperty({ isArray: true, type: () => Wishlist })
  wishlists: WishlistType[];
}
