import { ReturnStatus, PaymentStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from './user_type';
import { LoanDetailType } from './loandetail_type';

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
  returnStatus: ReturnStatusType;

  @ApiProperty({ type: Number })
  totalAmount: number;

  @ApiPropertyOptional({ type: String })
  paymentId: string | null;

  @ApiPropertyOptional({ enum: PaymentStatus, enumName: 'PaymentStatus' })
  paymentStatus: PaymentStatusType | null;

  @ApiPropertyOptional({ type: String })
  paymentMethod: string | null;

  @ApiPropertyOptional({ type: String })
  invoiceUrl: string | null;

  @ApiPropertyOptional({ type: Date })
  expiresAt: Date | null;
}
