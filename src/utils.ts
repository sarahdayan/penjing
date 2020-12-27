import path from 'path';

const separator = getEscapedSeparator(path.sep);

export function getEscapedSeparator(separator: string) {
  return separator === '/' ? '/' : '\\\\';
}

export const leadingTrailingSeparators = new RegExp(
  `^${separator}|${separator}$`,
  'g'
);
