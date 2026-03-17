# duration-format

> Lightweight duration formatter with multi-locale support.

[![npm version](https://img.shields.io/npm/v/duration-format?color=blue&label=npm)](https://www.npmjs.com/package/duration-format)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

---

## Install

```bash
pnpm add duration-format
```

---

## Usage

```ts
import { format } from 'duration-format'

format(3661) // '1 hour 1 minute'
format(3661, { locale: 'tr' }) // '1 saat 1 dakika'
format(3661, { locale: 'ru' }) // '1 час 1 минута'
format(3661, { style: 'short' }) // '1h 1min'
format(3661, { style: 'narrow' }) // '1h1m'
format(3661, { units: 1 }) // '1 hour'
format(3661, { locale: 'tr', style: 'short' }) // '1sa 1dk'
```

---

## Options

| Option   | Type                            | Default  | Description                 |
| -------- | ------------------------------- | -------- | --------------------------- |
| `locale` | `'en' \| 'tr' \| 'ru'`          | `'en'`   | Output language             |
| `style`  | `'long' \| 'short' \| 'narrow'` | `'long'` | Format style                |
| `units`  | `number`                        | `2`      | Max number of units to show |

---

## Styles

| Style    | Example             |
| -------- | ------------------- |
| `long`   | `1 hour 30 minutes` |
| `short`  | `1h 30min`          |
| `narrow` | `1h30m`             |

---

## createFormatter

Create a reusable formatter with preset options:

```ts
import { createFormatter } from 'duration-format'

const formatTr = createFormatter({ locale: 'tr' })

formatTr(3600) // '1 saat'
formatTr(90) // '1 dakika 30 saniye'
formatTr(3600, { style: 'short' }) // '1sa'
```

---

## Locales

| Locale | Language | Plural forms            |
| ------ | -------- | ----------------------- |
| `en`   | English  | singular / plural       |
| `tr`   | Turkish  | no plural               |
| `ru`   | Russian  | singular / few / plural |

---

## License

MIT
