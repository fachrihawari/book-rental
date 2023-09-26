import { User } from './user';
import { Book } from './book';
import { ApiProperty } from '@nestjs/swagger';

export class WishlistRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Book })
  book: Book;
}
