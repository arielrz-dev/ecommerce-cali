import { MongoIdPipe } from './mongo-id.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('MongoIdPipe', () => {
  let pipe: MongoIdPipe;

  beforeEach(() => {
    pipe = new MongoIdPipe();
  });

  it('should transform a valid MongoDB ID', () => {
    const value = '6473b3123456789012345678';
    const metadata: ArgumentMetadata = { type: 'param' };
    const transformedValue = pipe.transform(value, metadata);
    expect(transformedValue).toBe(value);
  });

  it('should throw an exception for an invalid MongoDB ID', () => {
    const value = 'invalid_id';
    const metadata: ArgumentMetadata = { type: 'param' };
    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });
});
