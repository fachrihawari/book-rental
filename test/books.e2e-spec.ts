import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '~/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { Book } from '~/prisma/models/book';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  const books: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      publishedYear: 2021,
      stock: 10,
      description: 'Description for Book 1',
      price: 9.99,
      imageUrl: 'https://example.com/book1.jpg',
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      publishedYear: 2022,
      stock: 5,
      description: 'Description for Book 2',
      price: 14.99,
      imageUrl: 'https://example.com/book2.jpg',
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      publishedYear: 2023,
      stock: 2,
      description: 'Description for Book 3',
      price: 19.99,
      imageUrl: 'https://example.com/book3.jpg',
    },
  ];


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = new PrismaClient();

    await prisma.book.createMany({ data: books });
  });

  describe('/books (GET)', () => {
    it('should return an array of books', async () => {
      const response = await request(app.getHttpServer()).get('/books');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body).toEqual(books);
    });
  });

  describe('/books/:id (GET)', () => {
    it('should return a book by id', async () => {
      const book = await prisma.book.findFirst();

      const response = await request(app.getHttpServer()).get(`/books/${book.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(book);
    });

    it('should return a 404 error if book not found', async () => {
      const response = await request(app.getHttpServer()).get('/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ statusCode: 404, message: 'Not Found' });
    });
  });

  afterAll(async () => {
    await prisma.book.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });
});