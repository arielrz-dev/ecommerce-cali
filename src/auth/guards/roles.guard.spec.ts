// import { Reflector } from '@nestjs/core';
// import { RolesGuard } from '../guards/roles.guard';

// describe('RolesGuard', () => {
//   let guard: RolesGuard;
//   let reflector: Reflector;

//   beforeEach(() => {
//     reflector = new Reflector();
//     guard = new RolesGuard(reflector);
//   });

//   it('should be defined', () => {
//     expect(guard).toBeDefined();
//   });
// });

import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  describe('canActivate', () => {
    it('should return true when no roles are required', () => {
      const context = createExecutionContext();
      jest.spyOn(reflector, 'get').mockReturnValue(null);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return true when user role matches', () => {
      const context = createExecutionContext({ role: 'admin' });
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw an error when user role mismatches', () => {
      const context = createExecutionContext({ role: 'user' });
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

      expect(() => guard.canActivate(context)).toThrowError(
        'Your role is not authorized',
      );
    });

    it('should throw an error when user is not defined', () => {
      const context = createExecutionContext();
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

      expect(() => guard.canActivate(context)).toThrowError();
    });
  });
});

function createExecutionContext(user?: { role: string }) {
  const context = {
    getHandler: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        user,
      }),
    }),
  } as unknown as ExecutionContext;
  return context;
}
