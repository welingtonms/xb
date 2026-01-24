import { describe, it, expect } from 'vitest';
import { CalendarDate } from './date.js';

describe('CalendarDate (Logic)', () => {
  it('should construct from components', () => {
    const d = new CalendarDate(2023, 10, 27);
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  it('should parse ISO strings', () => {
    const d = CalendarDate.fromISO('2023-10-27');
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  describe('Add Logic', () => {
    it('should add days correctly within a month', () => {
      const d = new CalendarDate(2023, 10, 1).add(5, 'day');
      expect(d.toString()).toBe('2023-10-06');
    });

    it('should rollover month when adding days', () => {
      const d = new CalendarDate(2023, 10, 31).add(1, 'day');
      expect(d.toString()).toBe('2023-11-01');
    });

    it('should rollover year when adding days', () => {
      const d = new CalendarDate(2023, 12, 31).add(1, 'day');
      expect(d.toString()).toBe('2024-01-01');
    });

    it('should handle leap years (Feb 29)', () => {
      const d = new CalendarDate(2020, 2, 28).add(1, 'day');
      expect(d.toString()).toBe('2020-02-29');
    });

    it('should handle non-leap years (Feb 28)', () => {
      const d = new CalendarDate(2021, 2, 28).add(1, 'day');
      expect(d.toString()).toBe('2021-03-01');
    });

    it('should add months correctly', () => {
      const d = new CalendarDate(2023, 1, 15).add(2, 'month');
      expect(d.toString()).toBe('2023-03-15');
    });

    it('should clamp day when adding months (Jan 31 + 1mo -> Feb 28)', () => {
      const d = new CalendarDate(2023, 1, 31).add(1, 'month');
      expect(d.toString()).toBe('2023-02-28');
    });

    it('should rollover year when adding months', () => {
       const d = new CalendarDate(2023, 11, 1).add(2, 'month');
       expect(d.toString()).toBe('2024-01-01');
    });
  });

  describe('Compare', () => {
    it('should compare correctly', () => {
      const a = new CalendarDate(2023, 1, 1);
      const b = new CalendarDate(2023, 1, 2);
      expect(a.compare(b)).toBeLessThan(0);
      expect(b.compare(a)).toBeGreaterThan(0);
      expect(a.compare(a)).toBe(0);
    });
  });
});
