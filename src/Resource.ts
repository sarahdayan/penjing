import fs from 'fs';
import path from 'path';

const root = process.cwd();

function getDestinationPath(filePath: string) {
  const separator = path.sep === '/' ? '/' : '\\\\';
  const leadingSeparator = new RegExp(`^${separator}`, 'g');

  const { dir, name } = path.parse(filePath.replace(leadingSeparator, ''));

  return path.normalize(`/${path.join(dir, name)}/`);
}

function getFileData(filePath: string) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

export class Resource {
  source;
  destination;
  data;

  constructor(sourcePath: string, destinationPath?: string) {
    this.source = sourcePath;
    this.destination = getDestinationPath(destinationPath || sourcePath);
    this.data = getFileData(sourcePath);
  }
}
