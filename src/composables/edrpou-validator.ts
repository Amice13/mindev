export function checkCode (value: number | string | undefined): boolean {
  if (value === undefined) {
    throw new Error('ЄДРПОУ не зазначено')
  }
  const edrpou = String(value).padStart(8, '0')
  const isSpecific = Number.parseInt(edrpou) > 30_000_000 && Number.parseInt(edrpou) < 60_000_000
  const numbers = edrpou.split('').map(x => Number.parseInt(x))
  let coefficients = isSpecific ? [7, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]
  let sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
  let result = sum % 11
  if (result === 10) {
    coefficients = isSpecific ? [9, 3, 4, 5, 6, 7, 8] : [3, 4, 5, 6, 7, 8, 9]
    sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
    result = sum % 11 % 10
  }
  return numbers[7] === result
}
