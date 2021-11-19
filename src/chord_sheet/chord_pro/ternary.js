import EvaluationError from './evaluation_error';
import { isPresent, presence } from '../../utilities';
import Composite from './composite';

class Ternary {
  constructor(
    {
      variable = null,
      valueTest = null,
      trueExpression = null,
      falseExpression = null,
      line = null,
      column = null,
      offset = null,
    } = {},
  ) {
    this.variable = presence(variable);
    this.valueTest = valueTest;
    this.trueExpression = trueExpression;
    this.falseExpression = falseExpression;
    this.line = line;
    this.column = column;
    this.offset = offset;
  }

  /**
   * Evaluate the meta expression
   * @param {Metadata} metadata The metadata object to use for evaluating the expression
   * @returns {string} The evaluated expression
   */
  evaluate(metadata, upperContext = null) {
    if (this.variable) {
      return this.evaluateWithVariable(metadata);
    }

    if (!upperContext) {
      throw new EvaluationError('Unexpected empty expression', this.line, this.column, this.offset);
    }

    return metadata.get(upperContext);
  }

  evaluateWithVariable(metadata) {
    const value = metadata.get(this.variable);

    if (isPresent(value) && (!this.valueTest || value === this.valueTest)) {
      return this.evaluateForTruthyValue(metadata, value);
    }

    if (this.falseExpression) {
      return new Composite(this.falseExpression, this.variable).evaluate(metadata);
    }

    return '';
  }

  evaluateForTruthyValue(metadata, value) {
    if (this.trueExpression) {
      return new Composite(this.trueExpression, this.variable).evaluate(metadata);
    }

    return value;
  }

  isRenderable() {
    return true;
  }

  clone() {
    return new Ternary({
      variable: this.variable,
      valueTest: this.valueTest,
      trueExpression: this.trueExpression?.map((part) => part.clone()),
      falseExpression: this.falseExpression?.map((part) => part.clone()),
      line: this.line,
      column: this.column,
      offset: this.offset,
    });
  }
}

export default Ternary;
