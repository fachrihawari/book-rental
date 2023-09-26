import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user_type';
import { BookType } from './book_type';

export class Wishlist {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  bookId: number;
}
