export function getEscapedSeparator(separator: string) {
  return separator === '/' ? '/' : '\\\\';
}
