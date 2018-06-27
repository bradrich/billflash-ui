import { BillRepeatIntervalPipe } from './bill-repeat-interval.pipe';

describe('BillRepeatIntervalPipe', () => {
  it('create an instance', () => {
    const pipe = new BillRepeatIntervalPipe();
    expect(pipe).toBeTruthy();
  });
});
