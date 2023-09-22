import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from 'src/prisma/models/book';
import { Public } from 'src/auth/auth.decorators';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Public()
  @ApiOkResponse({
    description: 'Returns all books.',
    schema: { items: { $ref: getSchemaPath(Book) } },
  })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({
    description: 'Returns a book by id.',
    schema: { $ref: getSchemaPath(Book) },
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async findById(@Param('id') id: string) {
    const book = await this.booksService.findById(+id);

    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }
}
