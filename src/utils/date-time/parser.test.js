import { describe, it, expect } from 'vitest';
import { Parser } from './parser.js';

describe('Parser', () => {
  it('should parse ISO string regardless of locale', () => {
    const parser = new Parser('en-US');
    const d = parser.parse('2023-10-27');
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  it('should parse MM/DD/YYYY for en-US', () => {
    const parser = new Parser('en-US');
    const d = parser.parse('10/27/2023');
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  it('should parse DD/MM/YYYY for pt-BR', () => {
    const parser = new Parser('pt-BR');
    const d = parser.parse('27/10/2023');
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  it('should handle different separators', () => {
    const parser = new Parser('en-US');
    const d = parser.parse('10-27-2023');
    expect(d.year).toBe(2023);
    expect(d.month).toBe(10);
    expect(d.day).toBe(27);
  });

  it('should return null for invalid dates', () => {
    const parser = new Parser('en-US');
    expect(parser.parse('foo')).toBe(null);
    expect(parser.parse('13/40/2023')).toBe(null); // Invalid month/day
  });
});
