const latinRegex = /[a-z\d]/i
export function validateUkrainian (string: string): boolean {
  return latinRegex.test(string)
}
