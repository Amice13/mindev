const latinRegex = /[a-z\d]/i
export const validateUkrainian = (string: string): boolean => {
  return latinRegex.test(string)
}
