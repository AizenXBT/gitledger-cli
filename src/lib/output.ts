export function info(message: string): void {
  console.log(`[info] ${message}`);
}

export function success(message: string): void {
  console.log(`[ok] ${message}`);
}

export function warn(message: string): void {
  console.warn(`[warn] ${message}`);
}

export function fail(message: string): never {
  throw new Error(message);
}
