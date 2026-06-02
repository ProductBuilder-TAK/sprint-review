import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

// @ts-expect-error — JS services
import { parseUnifiedCSV, aggregateBySprint } from '../services/csvParserV2.js'
// @ts-expect-error — JS services
import { average, median, completionRate } from '../services/metricsCalculator.js'
// @ts-expect-error — JS services
import { formatNumber, formatPercent } from '../utils/formatters.js'
// @ts-expect-error — JS services
import { isNumber, isEmpty } from '../utils/validators.js'

const FIXTURE_PATH = join(__dirname, 'fixtures', 'sprint-review-demo.csv')

describe('csvParserV2', () => {
  const csv = readFileSync(FIXTURE_PATH, 'utf-8')

  it('parses demo CSV without errors', () => {
    const result = parseUnifiedCSV(csv)
    expect(result).toBeDefined()
    expect(result.tickets).toBeDefined()
    expect(Array.isArray(result.tickets)).toBe(true)
  })

  it('extracts tickets with required fields', () => {
    const result = parseUnifiedCSV(csv)
    const ticket = result.tickets[0]
    expect(ticket).toHaveProperty('key')
    expect(ticket).toHaveProperty('type')
    expect(ticket).toHaveProperty('status')
  })

  it('detects teams from CSV structure', () => {
    const result = parseUnifiedCSV(csv)
    expect(result.teams).toBeDefined()
    expect(result.teams.length).toBeGreaterThan(0)
  })

  it('aggregates by sprint correctly', () => {
    const result = parseUnifiedCSV(csv)
    const sprintData = aggregateBySprint(result.tickets)
    expect(Array.isArray(sprintData)).toBe(true)
    expect(sprintData.length).toBeGreaterThan(0)

    const sprint = sprintData[0]
    expect(sprint).toHaveProperty('sprint')
    expect(sprint).toHaveProperty('closed')
    expect(sprint).toHaveProperty('totalTickets')
    expect(sprint.closed).toBeGreaterThanOrEqual(0)
  })
})

describe('metricsCalculator', () => {
  it('calculates average', () => {
    expect(average([2, 4, 6])).toBe(4)
    expect(average([])).toBe(0)
  })

  it('calculates median', () => {
    expect(median([1, 3, 5])).toBe(3)
    expect(median([1, 2, 3, 4])).toBe(2.5)
    expect(median([])).toBe(0)
  })

  it('calculates completion rate', () => {
    const result = completionRate(38, 41)
    // completionRate returns an object { rate, delivered, committed }
    expect(result.rate).toBeCloseTo(92.7, 0)
    expect(completionRate(0, 0).rate).toBe(0)
  })
})

describe('formatters', () => {
  it('formats numbers', () => {
    // Locale-dependent: may use comma or period as decimal separator
    const result = formatNumber(3.14159, 1)
    expect(result).toMatch(/3[.,]1/)
    expect(formatNumber(42, 0)).toBe('42')
  })

  it('formats percentages', () => {
    const result = formatPercent(85.5)
    // Rounds to nearest integer by default
    expect(result).toMatch(/8[56]/)
  })
})

describe('validators', () => {
  it('validates numbers', () => {
    expect(isNumber(42)).toBe(true)
    expect(isNumber('hello')).toBe(false)
    expect(isNumber(NaN)).toBe(false)
  })

  it('validates emptiness', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('hello')).toBe(false)
  })
})
