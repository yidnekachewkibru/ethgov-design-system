/**
 * Tiny classNames helper — joins truthy class strings.
 * Kept dependency-free (low-bandwidth / minimal supply chain).
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
