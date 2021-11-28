import { Chord } from '../../src';

describe('Chord', () => {
  describe('isNumeric', () => {
    describe('for a numeric chord', () => {
      it('returns true', () => {
        const chord = new Chord({ base: 1, bassBase: 3 });

        expect(chord.isNumeric()).toBe(true);
      });
    });

    describe('for a mixed chord', () => {
      it('returns false', () => {
        const chord = new Chord({ base: 'A', bassBase: 3 });

        expect(chord.isNumeric()).toBe(false);
      });
    });
  });
});
