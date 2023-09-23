import { Test, TestingModule } from '@nestjs/testing';
import { WishlistsService } from './wishlists.service';
import { PrismaService } from '~/prisma/prisma.service';
import { Wishlist } from '~/prisma/models/wishlist';

describe('WishlistsService', () => {
  let service: WishlistsService;
  let prismaService: PrismaService;

  const mockWishlists: Wishlist[] = [
    { id: 1, userId: 1, bookId: 1 },
    { id: 2, userId: 1, bookId: 2 },
    { id: 3, userId: 2, bookId: 1 },
  ];
  const mockWishlist: Wishlist = { id: 1, userId: 1, bookId: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistsService,
        {
          provide: PrismaService,
          useValue: {
            wishlist: {
              findMany: jest.fn().mockResolvedValue(mockWishlists),
              findFirst: jest.fn().mockResolvedValue(mockWishlist),
              create: jest
                .fn()
                .mockImplementation((data) =>
                  Promise.resolve({ id: 4, ...data }),
                ),
              delete: jest.fn().mockResolvedValue(mockWishlists[0]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WishlistsService>(WishlistsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of wishlists', async () => {
      const result = await service.findAll();

      expect(result).toEqual(mockWishlists);
      expect(prismaService.wishlist.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a wishlist item with the specified id', async () => {
      const id = 1;
      const result = await service.findById(id);

      expect(result).toEqual(mockWishlist);
      expect(prismaService.wishlist.findFirst).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('create', () => {
    it('should create a new wishlist item', async () => {
      const data = { userId: 1, bookId: 3 };
      jest.spyOn(prismaService.wishlist, 'create').mockResolvedValue({
        id: 4,
        ...data,
      });

      const result = await service.create(data);

      expect(result).toEqual({ id: 4, ...data });
      expect(prismaService.wishlist.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('delete', () => {
    it('should delete a wishlist item with the specified id', async () => {
      const id = 1;
      jest
        .spyOn(prismaService.wishlist, 'delete')
        .mockResolvedValue(mockWishlists[0]);

      const result = await service.delete(id);

      expect(result).toEqual(mockWishlists[0]);
      expect(prismaService.wishlist.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
