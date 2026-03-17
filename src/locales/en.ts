import type { LocaleDefinition } from '../types'

const en: LocaleDefinition = {
  long: {
    days: { singular: 'day', plural: 'days', narrow: 'd' },
    hours: { singular: 'hour', plural: 'hours', narrow: 'h' },
    minutes: { singular: 'minute', plural: 'minutes', narrow: 'm' },
    seconds: { singular: 'second', plural: 'seconds', narrow: 's' },
  },
  short: {
    days: 'd',
    hours: 'h',
    minutes: 'min',
    seconds: 'sec',
  },
}

export default en
