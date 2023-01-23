import { expect } from "chai";
import typeErrorHandler from '../src/typeErrorHandler';

describe('typeErrorHandler', () => {
  it('should throw an error', () => {
    expect(() => typeErrorHandler(['string', 'number'], {})).to.throw(Error, 'Invalid type. Expected string or number but received object');
    expect(() => typeErrorHandler(['object'], 'test-string')).to.throw(Error, 'Invalid type. Expected object but received string');
  });
});
