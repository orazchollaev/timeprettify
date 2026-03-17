export type Locale = 'en' | 'tr' | 'ru'

export type Style = 'long' | 'short' | 'narrow'

export interface FormatOptions {
  locale?: Locale
  style?: Style
  units?: number
}

export interface DurationParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface UnitDefinition {
  singular: string
  plural?: string
  few?: string // Russian has 3 plural forms
  narrow: string
}

export interface LocaleDefinition {
  long: {
    days: UnitDefinition
    hours: UnitDefinition
    minutes: UnitDefinition
    seconds: UnitDefinition
  }
  short: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}
