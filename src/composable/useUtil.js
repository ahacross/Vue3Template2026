export const useUtil = {
  delay: time => new Promise(resolve => setTimeout(resolve, time)),
  genId: (length = 7, str = '') =>
    `${str}${Math.random()
      .toString(36)
      .substring(2, length + 2)}`,
  comma: num => num.toLocaleString(),
}
