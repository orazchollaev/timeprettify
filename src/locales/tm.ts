import type { LocaleDefinition } from '../types'

const tm: LocaleDefinition = {
  long: {
    days: { singular: 'gün', narrow: 'g' },
    hours: { singular: 'sagat', narrow: 'sg' },
    minutes: { singular: 'minut', narrow: 'm' },
    seconds: { singular: 'sekunt', narrow: 'sk' },
  },
  short: {
    days: 'gün',
    hours: 'sag',
    minutes: 'min',
    seconds: 'sek',
  },
}

export default tm
