import {
  ChordLyricsPair,
  Line,
  Tag,
  NONE,
  Paragraph,
  Literal,
  Composite,
  Ternary,
  Song,
} from '../src';

export function createSong(lines, metadata) {
  const song = new Song(metadata);

  lines.forEach((line) => {
    if (Array.isArray(line)) {
      song.addLine();
      line.forEach((item) => song.addItem(item));
    } else {
      song.lines.push(line);
    }
  });

  song.finish();
  return song;
}

export function createLine(items, type = NONE) {
  const line = new Line();
  items.forEach((item) => line.addItem(item));
  line.type = type;
  return line;
}

export function createParagraph(lines) {
  const paragraph = new Paragraph();
  lines.forEach((line) => paragraph.addLine(line));
  return paragraph;
}

export function createChordLyricsPair(chords, lyrics) {
  return new ChordLyricsPair(chords, lyrics);
}

export function createTag(name, value) {
  const tag = new Tag();
  tag.name = name;
  tag.value = value || null;
  return tag;
}

export function createComposite(expressions) {
  return new Composite(expressions);
}

export function createLiteral(expression) {
  return new Literal(expression);
}

export function createTernary(
  {
    variable = '',
    valueTest = null,
    trueExpression = null,
    falseExpression = null,
    line = null,
    column = null,
    offset = null,
  },
) {
  return new Ternary({
    variable,
    valueTest,
    trueExpression,
    falseExpression,
    line,
    column,
    offset,
  });
}
