import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Wishlist } from '~/prisma/models/wishlist';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './wishlists.dto';

@ApiTags('Wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns an array of wishlist items',
    type: Wishlist,
    isArray: true,
  })
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  @ApiOkResponse({ description: 'Creates a new wishlist item', type: Wishlist })
  async create(
    @Request() req,
    @Body() data: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create({
      bookId: data.bookId,
      userId: req.user.sub,
    });
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Deletes a wishlist item with the specified id',
    type: Wishlist,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req, @Param('id') id: number): Promise<void> {
    const wishlist = await this.wishlistsService.findById(+id);

    if (!wishlist) {
      throw new NotFoundException();
    }

    if (wishlist.userId !== req.user.sub) {
      throw new UnauthorizedException();
    }

    await this.wishlistsService.delete(+id);
  }
}
