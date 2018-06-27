import { EncryptedPipe } from './encrypted.pipe';

describe('EncryptedPipe', () => {
  it('create an instance', () => {
    const pipe = new EncryptedPipe();
    expect(pipe).toBeTruthy();
  });
});
