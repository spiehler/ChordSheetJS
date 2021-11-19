import { HtmlDivFormatter } from '../../src';

import '../matchers';
import song from '../fixtures/song';
import { createChordLyricsPair, createSong } from '../utilities';

describe('HtmlDivFormatter', () => {
  it('formats a song to a html chord sheet correctly', () => {
    const formatter = new HtmlDivFormatter();

    const expectedChordSheet = '<h1>Let it be</h1>'
      + '<h2>ChordSheetJS example version</h2>'
      + '<div class="chord-sheet">'
        + '<div class="paragraph">'
          + '<div class="row">'
            + '<div class="column">'
              + '<div class="chord"></div>'
              + '<div class="lyrics">Written by: </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord"></div>'
              + '<div class="lyrics">John Lennon,Paul McCartney</div>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="paragraph verse">'
          + '<div class="row">'
            + '<div class="column">'
              + '<div class="chord"></div>'
              + '<div class="lyrics">Let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">Am</div>'
              + '<div class="lyrics">be, let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">C/G</div>'
              + '<div class="lyrics">be, let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">F</div>'
              + '<div class="lyrics">be, let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">C</div>'
              + '<div class="lyrics">be</div>'
            + '</div>'
          + '</div>'
          + '<div class="row">'
            + '<div class="column">'
              + '<div class="chord">C</div>'
              + '<div class="lyrics">Whisper words of </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">F</div>'
              + '<div class="lyrics">wis</div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">G</div>'
              + '<div class="lyrics">dom, let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">F</div>'
              + '<div class="lyrics">be </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">C/E</div>'
              + '<div class="lyrics"> </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">Dm</div>'
              + '<div class="lyrics"> </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">C</div>'
              + '<div class="lyrics"></div>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="paragraph chorus">'
          + '<div class="row">'
            + '<div class="comment">Breakdown</div>'
          + '</div>'
          + '<div class="row">'
            + '<div class="column">'
              + '<div class="chord">Am</div>'
              + '<div class="lyrics">Whisper words of </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">Bb</div>'
              + '<div class="lyrics">wisdom, let it </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">F</div>'
              + '<div class="lyrics">be </div>'
            + '</div>'
            + '<div class="column">'
              + '<div class="chord">C</div>'
              + '<div class="lyrics"></div>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>';

    expect(formatter.format(song)).toEqual(expectedChordSheet);
  });

  describe('with option renderBlankLines:false', () => {
    it('does not include HTML for blank lines', () => {
      const songWithBlankLine = createSong([
        [
          createChordLyricsPair('C', 'Whisper words of wisdom'),
        ],

        [],

        [
          createChordLyricsPair('Am', 'Whisper words of wisdom'),
        ],
      ]);

      const expectedChordSheet = '<div class="chord-sheet">'
          + '<div class="paragraph">'
            + '<div class="row">'
              + '<div class="column">'
                + '<div class="chord">C</div>'
                + '<div class="lyrics">Whisper words of wisdom</div>'
              + '</div>'
            + '</div>'
          + '</div>'
          + '<div class="paragraph">'
            + '<div class="row">'
              + '<div class="column">'
                + '<div class="chord">Am</div>'
                + '<div class="lyrics">Whisper words of wisdom</div>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>';

      const formatter = new HtmlDivFormatter({ renderBlankLines: false });

      expect(formatter.format(songWithBlankLine)).toEqual(expectedChordSheet);
    });
  });

  it('generates a CSS string', () => {
    const expectedCss = `
.chord:not(:last-child) {
  padding-right: 10px;
}

.paragraph {
  margin-bottom: 1em;
}

.row {
  display: flex;
}

.chord:after {
  content: '\\200b';
}

.lyrics:after {
  content: '\\200b';
}`.substring(1);

    expect(HtmlDivFormatter.cssString()).toEqual(expectedCss);
  });

  it('generates a scoped CSS string', () => {
    const expectedCss = `
.someScope .chord:not(:last-child) {
  padding-right: 10px;
}

.someScope .paragraph {
  margin-bottom: 1em;
}

.someScope .row {
  display: flex;
}

.someScope .chord:after {
  content: '\\200b';
}

.someScope .lyrics:after {
  content: '\\200b';
}`.substring(1);

    expect(HtmlDivFormatter.cssString('.someScope')).toEqual(expectedCss);
  });

  it('generates a CSS object', () => {
    expect(typeof HtmlDivFormatter.cssObject()).toEqual('object');
  });
});
