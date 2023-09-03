import { PrismaClient, ReturnStatus, PaymentStatus } from '@prisma/client';
import * as booksData from './fixtures/books.json'
import * as usersData from './fixtures/users.json'
import * as loansData from './fixtures/loans.json'

const prisma = new PrismaClient();

async function seedUsers() {
  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }
  console.log("Insert users success ✅")
}

async function seedBooks() {
  for (const bookData of booksData) {
    await prisma.book.create({
      data: bookData,
    });
  }
  console.log("Insert books success ✅")
}

async function seedLoans() {
  for (const loan of loansData) {
    const { loanDetails, ...loanData } = loan;

    await prisma.loan.create({
      data: {
        ...loanData,
        returnStatus: loanData.returnStatus as ReturnStatus,
        paymentStatus: loanData.paymentStatus as PaymentStatus,
        loanDetails: {
          createMany: {
            data: loanDetails.map((detail) => ({
              ...detail,
              loanFee: 0
            })),
          },
        },
      },
    });
  }
  console.log("Insert loans success ✅")
}


async function main() {
  await Promise.all([
    seedBooks(),
    seedUsers()
  ])
  await seedLoans()
}

main().catch(console.dir)
