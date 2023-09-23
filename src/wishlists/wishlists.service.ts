import { Injectable } from '@nestjs/common';
import { Wishlist } from '~/prisma/models/wishlist';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class WishlistsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<Wishlist[]> {
    return this.prismaService.wishlist.findMany({
      include: {
        book: true
      }
    });
  }

  findById(id: number): Promise<Wishlist> {
    return this.prismaService.wishlist.findFirst({
      where: { id },
    });
  }

  create(data: Omit<Wishlist, 'id'>): Promise<Wishlist> {
    return this.prismaService.wishlist.create({ data });
  }

  delete(id: number): Promise<Wishlist> {
    return this.prismaService.wishlist.delete({
      where: { id },
    });
  }
}
