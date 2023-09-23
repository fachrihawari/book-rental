import { ApiProperty } from '@nestjs/swagger';

export class Wishlist {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  bookId: number;
}
