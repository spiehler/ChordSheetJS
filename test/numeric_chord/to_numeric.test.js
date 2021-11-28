import { Chord } from '../../src';

import '../matchers';

describe('Chord', () => {
  describe('toNumeric', () => {
    describe('for a numeric chord', () => {
      it('returns a clone of the chord', () => {
        const originalChord = new Chord({
          base: 3,
          modifier: '#',
          suffix: 'sus4',
          bassBase: 5,
          bassModifier: 'b',
        });

        const numericChord = originalChord.toNumeric();
        expect(numericChord).not.toBe(originalChord);

        expect(numericChord).toBeChord({
          base: 3,
          modifier: '#',
          suffix: 'sus4',
          bassBase: 5,
          bassModifier: 'b',
        });
      });
    });
  });
});
