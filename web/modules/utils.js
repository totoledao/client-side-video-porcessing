export function parseBytesIntoMBAndGB(bytes) {
  const mb = bytes / (1024 * 1024);
  // if mb is greater than 1024, then convert to GB
  if (mb > 1024) {
    // rount to 2 decimal places
    return `${Math.round(mb / 1024)}GB`;
  }
  return `${Math.round(mb)}MB`;
}
