import { Test, TestingModule } from '@nestjs/testing';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { PrismaService } from '~/prisma/prisma.service';
import { Wishlist } from '~/prisma/models/wishlist';
import { CreateWishlistDto } from './wishlists.dto';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('WishlistsController', () => {
  let controller: WishlistsController;
  let service: WishlistsService;
  let prismaService: PrismaService;

  const mockWishlists: Wishlist[] = [
    { id: 1, userId: 1, bookId: 1 },
    { id: 2, userId: 1, bookId: 2 },
    { id: 3, userId: 2, bookId: 1 },
  ];

  const mockWishlist: Wishlist = { id: 1, userId: 1, bookId: 1 };

  const mockCreateWishlistDto: CreateWishlistDto = { bookId: 1 };

  const mockRequest = {
    user: { sub: 1 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistsController],
      providers: [
        WishlistsService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<WishlistsController>(WishlistsController);
    service = module.get<WishlistsService>(WishlistsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of wishlist items', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockWishlists);

      const result = await controller.findAll();

      expect(result).toEqual(mockWishlists);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new wishlist item', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockWishlist);

      const result = await controller.create(mockRequest, mockCreateWishlistDto);

      expect(result).toEqual(mockWishlist);
      expect(service.create).toHaveBeenCalledWith({
        bookId: mockCreateWishlistDto.bookId,
        userId: mockRequest.user.sub,
      });
    });
  });

  describe('delete', () => {
    it('should delete a wishlist item with the specified id', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValue(mockWishlist);
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await expect(controller.delete(mockRequest, id)).resolves.toBeUndefined();
      expect(service.findById).toHaveBeenCalledWith(id);
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if wishlist item not found', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValue(null);
      jest.spyOn(service, 'delete')

      await expect(controller.delete(mockRequest, id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.findById).toHaveBeenCalledWith(id);
      expect(service.delete).not.toHaveBeenCalled();
    });

    it('should throw an UnauthorizedException if user is not authorized', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValue({
        id,
        userId: 2,
        bookId: 1,
      });
      jest.spyOn(service, 'delete')

      await expect(controller.delete(mockRequest, id)).rejects.toThrowError(
        UnauthorizedException,
      );
      expect(service.findById).toHaveBeenCalledWith(id);
      expect(service.delete).not.toHaveBeenCalled();
    });
  });
});