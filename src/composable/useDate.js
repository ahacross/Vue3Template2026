import {
  add,
  sub,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfYear,
  endOfMonth,
  endOfDay,
  format,
  parse,
  isValid,
  toDate,
} from 'date-fns'
import { ko } from 'date-fns/locale'

const DATE = {
  COMPACT: 'yyyyMMdd',
  DASH: 'yyyy-MM-dd',
  DOT: 'yyyy.MM.dd',
}

const TIME = {
  COMPACT: 'HHmmss',
  COLON: 'HH:mm:ss',
}

export const DATE_TEMPLATE = {
  DATE: {
    ...DATE,
    DASH_DAY: `${DATE.DASH} (E)`,
    DOT_DAY: `${DATE.DOT} (E)`,
  },
  TIME,
  DATETIME: {
    COMPACT: `${DATE.COMPACT}T${TIME.COMPACT}`,
    /** yyyy.MM.ddTHH:mm:ss */
    DOT_COLON: `${DATE.DOT}T${TIME.COLON}`,
    /** yyyy-MM-ddTHH:mm:ss */
    DASH_COLON: `${DATE.DASH}T${TIME.COLON}`,
  },
}

/**
 * Parses a date value into a Date object.
 * @param {string|Date|number} date
 * @param {string} [template] Format string for parsing if date is string
 * @returns {Date}
 */
const parseDate = (date, template) => {
  if (!date) return new Date()
  if (date instanceof Date) return date
  if (typeof date === 'string' && template) {
    const parsed = parse(date, template, new Date(), { locale: ko })
    if (isValid(parsed)) return parsed
  }
  return toDate(date)
}

const mapUnitToDuration = (amount, unit) => {
  const u = unit.toLowerCase().replace(/s$/, '')
  switch (u) {
    case 'year':
      return { years: amount }
    case 'month':
      return { months: amount }
    case 'week':
      return { weeks: amount }
    case 'day':
      return { days: amount }
    case 'hour':
      return { hours: amount }
    case 'minute':
      return { minutes: amount }
    case 'second':
      return { seconds: amount }
    default:
      return {}
  }
}

const getDifference = (dateLeft, dateRight, unit) => {
  const u = unit.toLowerCase().replace(/s$/, '')
  switch (u) {
    case 'year':
      return differenceInYears(dateLeft, dateRight)
    case 'month':
      return differenceInMonths(dateLeft, dateRight)
    case 'day':
      return differenceInDays(dateLeft, dateRight)
    case 'hour':
      return differenceInHours(dateLeft, dateRight)
    case 'minute':
      return differenceInMinutes(dateLeft, dateRight)
    case 'second':
      return differenceInSeconds(dateLeft, dateRight)
    default:
      return 0
  }
}

const getEndOf = (date, unit) => {
  const d = parseDate(date)
  const u = unit.toLowerCase().replace(/s$/, '')
  switch (u) {
    case 'year':
      return endOfYear(d)
    case 'month':
      return endOfMonth(d)
    case 'day':
      return endOfDay(d)
    default:
      return d
  }
}

export const useDate = {
  /**
   * Returns a Date object or formatted string if needed (original returned dayjs object).
   * Here we return Date object for consistency.
   */
  getDate: (date, temp) => parseDate(date, temp),
  plus: (amount, unit, date) => add(parseDate(date), mapUnitToDuration(amount, unit)),
  minus: (amount, unit, date) => sub(parseDate(date), mapUnitToDuration(amount, unit)),
  diff: (date, unit) => getDifference(new Date(), parseDate(date), unit),
  diff2: (date1, date2, unit) => getDifference(parseDate(date1), parseDate(date2), unit),
  endOf: (date, unit) => getEndOf(date, unit),
  format: (date, template) => format(parseDate(date), template, { locale: ko }),
}
