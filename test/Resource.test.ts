import path from 'path';
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
        new Resource(path.normalize('path/to/invalid/file.txt'));
      }).toThrowError(/ENOENT: no such file or directory/);
    });
  });
  describe('#source', () => {
    it('returns the passed source path when valid', () => {
      const sourcePath = path.normalize('path/to/valid/file.txt');
      const r = new Resource(sourcePath);

      expect(r.source).toBe(sourcePath);
    });
  });
  describe('#data', () => {
    it('returns the content of the passed source', () => {
      const r = new Resource(path.normalize('path/to/valid/file.txt'));

      expect(r.data).toBe('Some content.');
    });
  });
  describe('#destination', () => {
    it('returns the passed source path by default', () => {
      const r = new Resource(path.normalize('path/to/valid/file.txt'));

      expect(r.destination).toBe(path.normalize('/path/to/valid/file/'));
    });
    it('returns the passed destination path when specified', () => {
      const r = new Resource(
        path.normalize('path/to/valid/file.txt'),
        path.normalize('destination/url')
      );

      expect(r.destination).toBe(path.normalize('/destination/url/'));
    });
    it('cleans up the path when it has leading and trailing slashes', () => {
      const destinationPath = path.normalize('/destination/url/');
      const r = new Resource(
        path.normalize('path/to/valid/file.txt'),
        destinationPath
      );

      expect(r.destination).toBe(destinationPath);
    });
  });
});
