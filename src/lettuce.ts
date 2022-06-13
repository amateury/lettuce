import * as parser from "./parser";

interface ILettuce {
  readonly schemes: parser.IScheme[];
  values?: parser.TValues;
}

class Lettuce implements ILettuce {
  /**
   * Object type property. List of validation schemes.
   * @defaultValue object
   */
  schemes: parser.IScheme[];

  /**
   * values to be validated
   * @defaultValue null
   */
  values?: parser.TValues;

  /**
   * Creates an instance of Lettuce.
   */
  constructor(schemas: parser.IScheme[], values?: parser.TValues) {
    this.schemes = schemas;
    if (values) this.values = values;
  }

  async parser(values?: parser.TValues): Promise<any> {
    if (values) this.values = values;
    return parser.parserScheme(this.schemes, this.values);
  }
}

export default Lettuce;
