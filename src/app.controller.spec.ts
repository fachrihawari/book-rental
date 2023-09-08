import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

const prisma = new PrismaClient();

const firstBook = {
  title: 'Sang Pencerah',
  author: 'Anonim',
  price: 59000,
  publishedYear: 2022,
  stock: 10,
  description: 'ini buku yg oke',
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    beforeAll(async () => {
      await prisma.book.create({
        data: firstBook,
      });
      await prisma.$disconnect();
    });

    afterAll(async () => {
      await prisma.$executeRaw`truncate "books" restart identity cascade;`;
      await prisma.$disconnect();
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello().message).toBe('Hello World!');
    });
    it('should return the first book', async () => {
      const firstBook = await appController.getFirstBook();
      expect(firstBook).toBeInstanceOf(Object);
      expect(firstBook.id).toEqual(1);
      expect(firstBook.title).toEqual(firstBook.title);
      expect(firstBook.author).toEqual(firstBook.author);
      expect(firstBook.description).toEqual(firstBook.description);
      expect(firstBook.author).toEqual(firstBook.author);
      expect(firstBook.price).toEqual(firstBook.price);
      expect(firstBook.stock).toEqual(firstBook.stock);
      expect(firstBook.publishedYear).toEqual(firstBook.publishedYear);
    });
  });
});
