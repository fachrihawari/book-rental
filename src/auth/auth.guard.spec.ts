import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  const getContext = (request = { headers: {} }) =>
    ({
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: () => {},
      getClass: () => {},
    }) as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if the route is public', async () => {
      // Mock the getAllAndOverride method to return true to simulate public route
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(true);

      const context = getContext();
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw an UnauthorizedException if no token is provided', async () => {
      const context = getContext();
      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if the token is invalid', async () => {
      const request = {
        headers: {
          authorization: 'Bearer invalid-token',
        },
      };
      const context = getContext(request);

      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error());

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should set the user in the request if the token is valid', async () => {
      const request = {
        headers: {
          authorization: 'Bearer valid-token',
        },
      };
      const context = getContext(request);

      const payload = {
        sub: 1,
        email: 'test@mail.com',
      };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce(payload);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);

      expect(request['user']).toEqual(payload);
    });
  });
});
