import mock from 'mock-fs';

import { Resource } from '../src';

beforeAll(() => {
  mock({
    'path/to/valid': {
      'file.txt': 'Some content.',
    },
  });
});

afterAll(() => {
  mock.restore();
});

describe('Resource', () => {
  describe('errors', () => {
    it('throws when passed a source path to an invalid file', () => {
      expect(() => {
        new Resource('path/to/invalid/file.txt');
      }).toThrowError(new Error('This file does not exist.'));
    });
  });
  describe('#source', () => {
    it('returns the passed source path when valid', () => {
      const r = new Resource('path/to/valid/file.txt');

      expect(r.source).toBe('path/to/valid/file.txt');
    });
  });
  describe('#data', () => {
    it('returns the content of the passed source', () => {
      const r = new Resource('path/to/valid/file.txt');

      expect(r.data).toBe('Some content.');
    });
  });
  describe('#destination', () => {
    it('returns the passed source path by default', () => {
      const r = new Resource('path/to/valid/file.txt');

      expect(r.destination).toBe('/path/to/valid/file/');
    });
    it('returns the passed destination path when specified', () => {
      const r = new Resource('path/to/valid/file.txt', 'destination/url');

      expect(r.destination).toBe('/destination/url/');
    });
    it('cleans up the path when it has leading and trailing slashes', () => {
      const r = new Resource('path/to/valid/file.txt', '/destination/url/');

      expect(r.destination).toBe('/destination/url/');
    });
  });
});
