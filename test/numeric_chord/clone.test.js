import Chord from '../../src/chord';
import '../matchers';

describe('Chord', () => {
  describe('clone', () => {
    it('assigns the right instance variables', () => {
      const chord = new Chord({
        base: 1,
        modifier: 'b',
        suffix: 'sus4',
        bassBase: 3,
        bassModifier: '#',
      });

      const clonedChord = chord.clone();
      expect(clonedChord).toBeChord({
        base: 1, modifier: 'b', suffix: 'sus4', bassBase: 3, bassModifier: '#',
      });
    });
  });
});
