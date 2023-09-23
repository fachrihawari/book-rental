import { Loan } from './loan';
import { Wishlist } from './wishlist';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Loan })
  loans: Loan[];

  @ApiProperty({ isArray: true, type: () => Wishlist })
  wishlists: Wishlist[];
}
