import { describe, it, expect } from 'vitest';
import { pensum, specialtiesList } from './pensum';

describe('Pensum Data Layer Integrity', () => {
  it('should have properly structured subjects', () => {
    pensum.forEach(subject => {
      expect(subject).toHaveProperty('code');
      expect(subject).toHaveProperty('name');
      expect(subject).toHaveProperty('uc');
      expect(subject.uc).toBeGreaterThan(0);
      expect(subject).toHaveProperty('reqs');
      expect(Array.isArray(subject.reqs)).toBe(true);
      expect(typeof subject.reqCr).toBe('number');
    });
  });

  it('no subject should have a prerequisite that does not exist in the pensum', () => {
    const allCodes = pensum.map(s => s.code);
    pensum.forEach(subject => {
      subject.reqs.forEach(req => {
        // Assert that the reference code exists in the master list
        const exists = allCodes.includes(req);
        if (!exists) {
            console.error(`Invalid prerequisite '${req}' in subject '${subject.name}'`);
        }
        expect(allCodes).toContain(req);
      });
    });
  });

  it('specialties should match the predefined list and valid semesters', () => {
    pensum.forEach(subject => {
      if (subject.specialties) {
        Object.keys(subject.specialties).forEach(sp => {
          expect(specialtiesList).toContain(sp);
          expect(subject.specialties[sp]).toBeGreaterThanOrEqual(8);
          expect(subject.specialties[sp]).toBeLessThanOrEqual(10);
        });
      } else {
        expect(subject.common).toBe(true);
      }
    });
  });
});
