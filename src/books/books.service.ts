import { Injectable } from '@nestjs/common';
import { Book } from 'src/prisma/models/book';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Book[]> {
    return this.prismaService.book.findMany();
  }

  async findById(id: number): Promise<Book> {
    return this.prismaService.book.findUnique({
      where: { id },
    });
  }
}
