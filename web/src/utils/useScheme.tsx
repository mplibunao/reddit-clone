// Uses https when available
export const useScheme = (proto: string): string => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto
}
