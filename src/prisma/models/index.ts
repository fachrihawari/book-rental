import { User as _User } from './user';
import { Book as _Book } from './book';
import { Loan as _Loan } from './loan';
import { LoanDetail as _LoanDetail } from './loan_detail';

export namespace PrismaModel {
  export class User extends _User {}
  export class Book extends _Book {}
  export class Loan extends _Loan {}
  export class LoanDetail extends _LoanDetail {}

  export const extraModels = [User, Book, Loan, LoanDetail];
}
