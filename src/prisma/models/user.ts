import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoanType } from './loan_type';
import { WishlistType } from './wishlist_type';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  name: string | null;

  @ApiPropertyOptional({ type: String })
  otp: string | null;
}
