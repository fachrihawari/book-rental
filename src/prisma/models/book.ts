import { LoanDetail } from './loan_detail';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  author: string;

  @ApiProperty({ type: Number })
  publishedYear: number;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiPropertyOptional({ type: String })
  description: string | null;

  @ApiProperty({ type: Number })
  price: number;

  @ApiPropertyOptional({ type: String })
  imageUrl: string | null;

  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetail[];
}
