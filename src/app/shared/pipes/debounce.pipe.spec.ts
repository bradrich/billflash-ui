import { DebouncePipe } from './debounce.pipe';

describe('DebouncePipe', () => {
  it('create an instance', () => {
    const pipe = new DebouncePipe();
    expect(pipe).toBeTruthy();
  });
});
