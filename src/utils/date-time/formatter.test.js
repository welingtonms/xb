import { describe, it, expect } from 'vitest';
import { Formatter } from './formatter.js';
import { CalendarDate } from './date.js';

describe('Formatter', () => {
  it('should return weekdays for en-US', () => {
    const fmt = new Formatter('en-US');
    const days = fmt.getWeekdays();
    expect(days[0].label).toBe('Sunday');
    expect(days[1].label).toBe('Monday');
    expect(days[0].abbr).toBe('Sun');
  });

  it('should return weekdays for pt-BR', () => {
    const fmt = new Formatter('pt-BR');
    const days = fmt.getWeekdays();
    // In pt-BR, Sunday is Domingo
    // Note: Intl often returns lowercase for pt-BR weekdays depending on implementation,
    // but usually capitalized in modern browsers. Let's check looseness or standard.
    // Node 18+ usually returns "domingo".
    expect(days[0].label.toLowerCase()).toContain('domingo');
    expect(days[1].label.toLowerCase()).toContain('segunda');
  });

  it('should return months for en-US', () => {
    const fmt = new Formatter('en-US');
    const months = fmt.getMonths();
    expect(months[0].label).toBe('January');
    expect(months[11].label).toBe('December');
  });

  it('should return months for ja-JP', () => {
    const fmt = new Formatter('ja-JP');
    const months = fmt.getMonths();
    // 1月
    expect(months[0].label).toBe('1月');
  });

  it('should format a date struct', () => {
    const fmt = new Formatter('en-US');
    const date = new CalendarDate(2023, 10, 27); // Oct 27
    const output = fmt.format(date, { month: 'long', day: 'numeric', year: 'numeric' });
    expect(output).toBe('October 27, 2023');
  });
});
