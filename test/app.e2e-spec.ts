import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const firstBook = {
  title: "Sang Pencerah",
  author: "Anonim",
  price: 59000,
  publishedYear: 2022,
  stock: 10,
  description: "ini buku yg oke"
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await prisma.book.create({
      data: firstBook
    })
    await prisma.$disconnect()
  })

  afterAll(async () => {
    await prisma.$executeRaw`truncate "books" restart identity cascade;`
    await prisma.$disconnect()
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Hello World!'
    });
  });

  it('/1st (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/1st')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body.id).toBe(1)
    expect(response.body.title).toEqual(firstBook.title)
    expect(response.body.author).toEqual(firstBook.author)
    expect(response.body.description).toEqual(firstBook.description)
    expect(response.body.author).toEqual(firstBook.author)
    expect(response.body.price).toEqual(firstBook.price)
    expect(response.body.stock).toEqual(firstBook.stock)
    expect(response.body.publishedYear).toEqual(firstBook.publishedYear)
  });
});
