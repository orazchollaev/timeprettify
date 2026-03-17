import type {
  DurationParts,
  FormatOptions,
  Locale,
  LocaleDefinition,
  UnitDefinition,
} from './types'
import en from './locales/en'
import tr from './locales/tr'
import ru from './locales/ru'

const LOCALES: Record<Locale, LocaleDefinition> = { en, tr, ru }

function parseToParts(seconds: number): DurationParts {
  const abs = Math.abs(Math.floor(seconds))
  const days = Math.floor(abs / 86400)
  const hours = Math.floor((abs % 86400) / 3600)
  const minutes = Math.floor((abs % 3600) / 60)
  const secs = abs % 60
  return { days, hours, minutes, seconds: secs }
}

function pluralizeRu(n: number, def: UnitDefinition): string {
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod100 >= 11 && mod100 <= 19) return def.plural ?? def.singular
  if (mod10 === 1) return def.singular
  if (mod10 >= 2 && mod10 <= 4) return def.few ?? def.singular
  return def.plural ?? def.singular
}

function pluralizeEn(n: number, def: UnitDefinition): string {
  return n === 1 ? def.singular : (def.plural ?? def.singular)
}

function getUnit(n: number, def: UnitDefinition, locale: Locale): string {
  if (locale === 'ru') return pluralizeRu(n, def)
  if (locale === 'tr') return def.singular
  return pluralizeEn(n, def)
}

function formatPart(
  value: number,
  key: keyof LocaleDefinition['long'],
  locale: Locale,
  style: FormatOptions['style'],
): string {
  const def = LOCALES[locale]

  if (style === 'narrow') {
    return `${value}${def.long[key].narrow}`
  }

  if (style === 'short') {
    return `${value}${def.short[key]}`
  }

  // long
  const unit = getUnit(value, def.long[key], locale)
  return `${value} ${unit}`
}

export function format(seconds: number, options: FormatOptions = {}): string {
  const { locale = 'en', style = 'long', units = 2 } = options

  if (!LOCALES[locale]) {
    throw new Error(`[duration-format] Unknown locale: "${locale}". Supported: en, tr, ru`)
  }

  if (seconds < 0) {
    return format(-seconds, options)
  }

  if (seconds === 0) {
    return formatPart(0, 'seconds', locale, style)
  }

  const parts = parseToParts(seconds)

  const result: string[] = []

  if (parts.days > 0) result.push(formatPart(parts.days, 'days', locale, style))
  if (parts.hours > 0) result.push(formatPart(parts.hours, 'hours', locale, style))
  if (parts.minutes > 0) result.push(formatPart(parts.minutes, 'minutes', locale, style))
  if (parts.seconds > 0) result.push(formatPart(parts.seconds, 'seconds', locale, style))

  const separator = style === 'narrow' ? '' : ' '
  return result.slice(0, units).join(separator)
}

export function createFormatter(defaults: FormatOptions) {
  return (seconds: number, overrides: FormatOptions = {}): string => {
    return format(seconds, { ...defaults, ...overrides })
  }
}
