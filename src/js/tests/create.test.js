import {foo} from './create';

describe('test for foo Function', () => {
  describe('it should return 10 after call', () => {
    it('return 10', () => {
      expect(foo()).toBe(10);
    });
  });
});
