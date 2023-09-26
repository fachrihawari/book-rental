import { User } from './user';
import { Book } from './book';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user_type';
import { BookType } from './book_type';

export class WishlistRelations {
  @ApiProperty({ type: () => User })
  user: UserType;

  @ApiProperty({ type: () => Book })
  book: BookType;
}
