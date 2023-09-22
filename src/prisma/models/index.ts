import { UserRelations as _UserRelations } from './user_relations';
import { BookRelations as _BookRelations } from './book_relations';
import { LoanRelations as _LoanRelations } from './loan_relations';
import { LoanDetailRelations as _LoanDetailRelations } from './loan_detail_relations';
import { User as _User } from './user';
import { Book as _Book } from './book';
import { Loan as _Loan } from './loan';
import { LoanDetail as _LoanDetail } from './loan_detail';

export namespace PrismaModel {
  export class UserRelations extends _UserRelations {}
  export class BookRelations extends _BookRelations {}
  export class LoanRelations extends _LoanRelations {}
  export class LoanDetailRelations extends _LoanDetailRelations {}
  export class User extends _User {}
  export class Book extends _Book {}
  export class Loan extends _Loan {}
  export class LoanDetail extends _LoanDetail {}

  export const extraModels = [
    UserRelations,
    BookRelations,
    LoanRelations,
    LoanDetailRelations,
    User,
    Book,
    Loan,
    LoanDetail,
  ];
}
