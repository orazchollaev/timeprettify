import { describe, it, expect } from 'vitest'
import { format, createFormatter } from '../src/formatter'

describe('format', () => {
  describe('Temel Dönüşümler', () => {
    it('0 saniye döner', () => {
      expect(format(0)).toBe('0 seconds')
    })

    it('sadece saniye gösterir', () => {
      expect(format(45)).toBe('45 seconds')
    })

    it('sadece dakika gösterir', () => {
      expect(format(120)).toBe('2 minutes')
    })

    it('dakika ve saniye gösterir', () => {
      expect(format(90)).toBe('1 minute 30 seconds')
    })

    it('saat ve dakika gösterir', () => {
      expect(format(3600)).toBe('1 hour')
      expect(format(3660)).toBe('1 hour 1 minute')
    })

    it('gün, saat gösterir', () => {
      expect(format(86400)).toBe('1 day')
      expect(format(90000)).toBe('1 day 1 hour')
    })

    it('negatif sayıyı pozitif gibi formatlar', () => {
      expect(format(-3600)).toBe('1 hour')
    })
  })

  describe('units seçeneği', () => {
    it('units: 1 ile sadece en büyük birimi gösterir', () => {
      expect(format(3661, { units: 1 })).toBe('1 hour')
    })

    it('units: 3 ile üç birim gösterir', () => {
      expect(format(3661, { units: 3 })).toBe('1 hour 1 minute 1 second')
    })
  })

  describe('style: short', () => {
    it('kısa format gösterir', () => {
      expect(format(3661, { style: 'short' })).toBe('1h 1min')
    })

    it('Türkçe kısa format', () => {
      expect(format(3661, { locale: 'tr', style: 'short' })).toBe('1sa 1dk')
    })

    it('Rusça kısa format', () => {
      expect(format(3661, { locale: 'ru', style: 'short' })).toBe('1ч 1мин')
    })
  })

  describe('style: narrow', () => {
    it('dar format gösterir', () => {
      expect(format(3661, { style: 'narrow' })).toBe('1h1m')
    })

    it('Türkçe dar format', () => {
      expect(format(3661, { locale: 'tr', style: 'narrow' })).toBe('1sa1dk')
    })

    it('Rusça dar format', () => {
      expect(format(3661, { locale: 'ru', style: 'narrow' })).toBe('1ч1м')
    })
  })

  describe('Türkçe (tr)', () => {
    it('tekil birimler gösterir — Türkçede çoğul yok', () => {
      expect(format(1, { locale: 'tr' })).toBe('1 saniye')
      expect(format(60, { locale: 'tr' })).toBe('1 dakika')
      expect(format(3600, { locale: 'tr' })).toBe('1 saat')
      expect(format(86400, { locale: 'tr' })).toBe('1 gün')
    })

    it('büyük değerlerde de tekil kalır', () => {
      expect(format(7200, { locale: 'tr' })).toBe('2 saat')
      expect(format(180, { locale: 'tr' })).toBe('3 dakika')
    })
  })

  describe('Türkmençe (tm)', () => {
    it('tekil birimler gösterir — Türkmençede çoğul yok', () => {
      expect(format(1, { locale: 'tm' })).toBe('1 sekunt')
      expect(format(60, { locale: 'tm' })).toBe('1 minut')
      expect(format(3600, { locale: 'tm' })).toBe('1 sagat')
      expect(format(86400, { locale: 'tm' })).toBe('1 gün')
    })

    it('büyük değerlerde de tekil kalır', () => {
      expect(format(7200, { locale: 'tm' })).toBe('2 sagat')
      expect(format(180, { locale: 'tm' })).toBe('3 minut')
    })
  })

  describe('İngilizce çoğul (en)', () => {
    it('1 için tekil kullanır', () => {
      expect(format(1, { locale: 'en' })).toBe('1 second')
      expect(format(60, { locale: 'en' })).toBe('1 minute')
      expect(format(3600, { locale: 'en' })).toBe('1 hour')
      expect(format(86400, { locale: 'en' })).toBe('1 day')
    })

    it('2+ için çoğul kullanır', () => {
      expect(format(2, { locale: 'en' })).toBe('2 seconds')
      expect(format(120, { locale: 'en' })).toBe('2 minutes')
      expect(format(7200, { locale: 'en' })).toBe('2 hours')
      expect(format(172800, { locale: 'en' })).toBe('2 days')
    })
  })

  describe('Rusça çoğul (ru)', () => {
    it('1 için tekil kullanır', () => {
      expect(format(1, { locale: 'ru' })).toBe('1 секунда')
      expect(format(60, { locale: 'ru' })).toBe('1 минута')
      expect(format(3600, { locale: 'ru' })).toBe('1 час')
      expect(format(86400, { locale: 'ru' })).toBe('1 день')
    })

    it('2-4 için few kullanır', () => {
      expect(format(2, { locale: 'ru' })).toBe('2 секунды')
      expect(format(120, { locale: 'ru' })).toBe('2 минуты')
      expect(format(7200, { locale: 'ru' })).toBe('2 часа')
      expect(format(172800, { locale: 'ru' })).toBe('2 дня')
    })

    it('5+ için plural kullanır', () => {
      expect(format(5, { locale: 'ru' })).toBe('5 секунд')
      expect(format(300, { locale: 'ru' })).toBe('5 минут')
      expect(format(18000, { locale: 'ru' })).toBe('5 часов')
    })

    it('11-19 için her zaman plural kullanır (Rusça istisna)', () => {
      expect(format(11, { locale: 'ru' })).toBe('11 секунд')
      expect(format(660, { locale: 'ru' })).toBe('11 минут')
      expect(format(39600, { locale: 'ru' })).toBe('11 часов')
    })

    it('21 için tekil kullanır (mod10 = 1)', () => {
      expect(format(21, { locale: 'ru' })).toBe('21 секунда')
    })
  })

  describe('Hata Yönetimi', () => {
    it('bilinmeyen locale için hata fırlatır', () => {
      expect(() => format(60, { locale: 'de' as any })).toThrow('[timeprettify]')
    })
  })

  describe('createFormatter', () => {
    it('varsayılan locale ile formatter oluşturur', () => {
      const formatTr = createFormatter({ locale: 'tr' })
      expect(formatTr(3600)).toBe('1 saat')
      expect(formatTr(90)).toBe('1 dakika 30 saniye')
    })

    it('override ile varsayılanı ezer', () => {
      const formatTr = createFormatter({ locale: 'tr' })
      expect(formatTr(3600, { style: 'short' })).toBe('1sa')
    })

    it('varsayılan style ile formatter oluşturur', () => {
      const formatShort = createFormatter({ style: 'short' })
      expect(formatShort(3661)).toBe('1h 1min')
    })
  })
})
