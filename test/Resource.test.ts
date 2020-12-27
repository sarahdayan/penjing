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
  describe('instantation', () => {
    it('instantiates a new resource from arguments', () => {
      const sourcePath = path.normalize('path/to/valid/file.txt');
      const destinationPath = '/path/to/valid/file/';
      const data = 'Some content.';

      const resource = new Resource(sourcePath, destinationPath, data);

      expect(resource.source).toBe(sourcePath);
      expect(resource.destination).toBe(path.normalize(destinationPath));
      expect(resource.data).toBe(data);
    });
    it('instantiates a new resource from a file path', () => {
      const sourcePath = path.normalize('path/to/valid/file.txt');

      const resource = Resource.createFromPath(sourcePath);

      expect(resource.source).toBe(sourcePath);
      expect(resource.data).toBe('Some content.');
      expect(resource.destination).toBe('/path/to/valid/file/');
    });
    it('throws when passed a source path to an invalid file', () => {
      expect(() => {
        Resource.createFromPath(path.normalize('path/to/invalid/file.txt'));
      }).toThrowError(/ENOENT: no such file or directory/);
    });
  });
  describe('properties', () => {
    describe('#source', () => {
      it('returns the passed source path', () => {
        const sourcePath = path.normalize('path/to/valid/file.txt');
        const resource = Resource.createFromPath(sourcePath);

        expect(resource.source).toBe(sourcePath);
      });
    });
    describe('#data', () => {
      it('returns the content of the passed source', () => {
        const resource = Resource.createFromPath(
          path.normalize('path/to/valid/file.txt')
        );

        expect(resource.data).toBe('Some content.');
      });
    });
    describe('#destination', () => {
      it('returns the passed source path by default', () => {
        const resource = Resource.createFromPath(
          path.normalize('path/to/valid/file.txt')
        );

        expect(resource.destination).toBe('/path/to/valid/file/');
      });
      it('returns the passed destination path when specified', () => {
        const resource = Resource.createFromPath(
          path.normalize('path/to/valid/file.txt'),
          'destination/url'
        );

        expect(resource.destination).toBe('/destination/url/');
      });
      it('cleans up the path when it has leading and trailing slashes', () => {
        const destinationPath = '/destination/url/';
        const resource = Resource.createFromPath(
          path.normalize('path/to/valid/file.txt'),
          destinationPath
        );

        expect(resource.destination).toBe(destinationPath);
      });
    });
  });
});
