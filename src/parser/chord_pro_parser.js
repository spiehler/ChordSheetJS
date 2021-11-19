import ChordProPegParser from './chord_pro_peg_parser';
import ChordSheetSerializer from '../chord_sheet_serializer';

/**
 * Parses a ChordPro chord sheet
 */
class ChordProParser {
  /**
   * Parses a ChordPro chord sheet into a song
   * @param {string} chordProChordSheet the ChordPro chord sheet
   * @returns {Song} The parsed song
   */
  parse(chordProChordSheet) {
    /**
     * All warnings raised during parsing the ChordPro chord sheet
     * @member
     * @type {Array<ParserWarning>}
     */
    const ast = ChordProPegParser.parse(chordProChordSheet);
    this.song = new ChordSheetSerializer().deserialize(ast);
    return this.song;
  }

  /**
   * All warnings raised during parsing the ChordPro chord sheet
   * @member
   * @type {ParserWarning[]}
   */
  get warnings() {
    return this.song.warnings;
  }
}

export default ChordProParser;
