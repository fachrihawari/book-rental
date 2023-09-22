import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
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
        schema: { items: { $ref: getSchemaPath(Book) } }
    })
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOkResponse({ 
        description: 'Returns a book by id.',
        schema: { $ref: getSchemaPath(Book) }
    })
    findById(@Param('id') id: string) {
        return this.booksService.findById(+id);
    }
}
