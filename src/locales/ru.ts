import type { LocaleDefinition } from '../types'

// Russian has 3 plural forms:
// singular: 1 (1 час)
// few:      2-4 (2 часа)
// plural:   5+ (5 часов)
const ru: LocaleDefinition = {
  long: {
    days: { singular: 'день', few: 'дня', plural: 'дней', narrow: 'д' },
    hours: { singular: 'час', few: 'часа', plural: 'часов', narrow: 'ч' },
    minutes: { singular: 'минута', few: 'минуты', plural: 'минут', narrow: 'м' },
    seconds: { singular: 'секунда', few: 'секунды', plural: 'секунд', narrow: 'с' },
  },
  short: {
    days: 'д',
    hours: 'ч',
    minutes: 'мин',
    seconds: 'сек',
  },
}

export default ru
