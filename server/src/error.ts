export interface SysException extends Error {
  errno: number;
  code: string;
  syscall?: string;
  stack?: string;
}

export function isSysException(
  err: unknown | SysException
): err is SysException {
  if (!(err instanceof Error)) return false;
  if (!("errno" in (err as SysException))) return false;
  if (!("code" in (err as SysException))) return false;
  return true;
}
