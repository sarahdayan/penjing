import fs from 'fs';
import path from 'path';

const root = process.cwd();

export class Resource {
  source;
  destination;
  data;

  constructor(sourcePath: string, destinationPath?: string) {
    if (fs.existsSync(path.join(root, sourcePath))) {
      this.source = sourcePath;
      this.destination = this.toDestinationPath(destinationPath || sourcePath);
      this.data = this.parse(sourcePath);

      return;
    }

    throw new Error('This file does not exist.');
  }

  private parse(filePath: string) {
    return fs.readFileSync(path.join(root, filePath), 'utf8');
  }

  private toDestinationPath(filePath: string) {
    const separator = path.sep === '/' ? '/' : '\\\\';
    const leadingSeparator = new RegExp(`^${separator}`, 'g');

    const { dir, name } = path.parse(filePath.replace(leadingSeparator, ''));

    return path.normalize(`/${path.join(dir, name)}/`);
  }
}
