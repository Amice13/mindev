const latinRegex = /[a-z]/i
export const validateUkrainian = (string: string): boolean => {
  return latinRegex.test(string)
}
