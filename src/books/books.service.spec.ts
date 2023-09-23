import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '~/prisma/prisma.service';
import { Book } from '~/prisma/models/book';

describe('BooksService', () => {
  let service: BooksService;
  let prismaService: PrismaService;

  const mockBooks: Book[] = [
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(prismaService.book, 'findMany').mockResolvedValue(mockBooks);

      const result = await service.findAll();

      expect(result).toEqual(mockBooks);
    });
  });

  describe('findById', () => {
    it('should return a book with the specified id', async () => {
      const mockBook = mockBooks[0];
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(mockBook);

      const result = await service.findById(mockBook.id);

      expect(result).toEqual(mockBook);
    });

    it('should return null if book not found', async () => {
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      const result = await service.findById(1);

      expect(result).toBeNull();
    });
  });
});
