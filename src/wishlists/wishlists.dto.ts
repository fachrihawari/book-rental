import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  bookId: number;
}
