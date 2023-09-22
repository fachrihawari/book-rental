import { User } from './user';
import { LoanDetail } from './loan_detail';
import { ReturnStatus, PaymentStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Loan {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  loanDate: Date;

  @ApiProperty({ type: Date })
  dueDate: Date;

  @ApiProperty({ enum: ReturnStatus, enumName: 'ReturnStatus' })
  returnStatus: ReturnStatus;

  @ApiProperty({ type: Number })
  totalAmount: number;

  @ApiPropertyOptional({ type: String })
  paymentId?: string;

  @ApiPropertyOptional({ enum: PaymentStatus, enumName: 'PaymentStatus' })
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({ type: String })
  paymentMethod?: string;

  @ApiPropertyOptional({ type: String })
  invoiceUrl?: string;

  @ApiPropertyOptional({ type: Date })
  expiresAt?: Date;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => LoanDetail })
  loanDetails: LoanDetail[];
}
