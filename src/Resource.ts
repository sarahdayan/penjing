import fs from 'fs';
import path from 'path';

export type Resource = {
  source: string;
  destination: string;
  data: string;
};

const root = process.cwd();

function getFileData(filePath: string) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function getDestinationPath(filePath: string) {
  const separator = path.sep === '/' ? '/' : '\\\\';
  const leadingSeparator = new RegExp(`^${separator}`, 'g');

  const { dir, name } = path.parse(filePath.replace(leadingSeparator, ''));

  return path.normalize(`/${path.join(dir, name)}/`);
}

export function resource(
  sourcePath: string,
  destinationPath?: string
): Resource {
  const source = sourcePath;
  const destination = getDestinationPath(destinationPath || sourcePath);
  const data = getFileData(sourcePath);

  return { source, destination, data };
}
