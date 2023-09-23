import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from '~/prisma/models/book';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

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
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockBooks),
            findById: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(mockBooks.find((book) => book.id === id)),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(mockBooks);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a book with the specified id', async () => {
      const mockBook = mockBooks[0];
      const result = await controller.findById(mockBook.id.toString());

      expect(result).toEqual(mockBook);
      expect(service.findById).toHaveBeenCalledWith(mockBook.id);
    });

    it('should return null if book not found', async () => {
      await expect(controller.findById('999')).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.findById).toHaveBeenCalledWith(999);
    });
  });
});
