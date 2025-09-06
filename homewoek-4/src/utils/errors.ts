// src/utils/errors.ts
export function humanizeError(
  e: unknown,
  fallback = '요청을 처리하지 못했습니다.'
) {
  if (typeof e === 'string') return e
  if (e && typeof e === 'object' && 'message' in e)
    return String((e as any).message)
  return fallback
}
