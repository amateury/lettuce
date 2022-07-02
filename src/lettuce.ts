import * as parser from "./parser";

interface TParamConstructor {
  values?: parser.TValues;
  strictCycle?: parser.TStrictCycle;
}

interface ILettuce {
  readonly schemes: parser.IScheme[];
  values?: parser.TValues;
  config?: parser.TConfig;
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
  config?: parser.TConfig;

  /**
   * Creates an instance of Lettuce.
   * @param schemas - Schemas validation
   * @param crossing - Configuration data, and optional for validation
   */
  constructor(schemas: parser.IScheme[], crossing?: TParamConstructor) {
    const { values, strictCycle } = crossing ?? {};
    this.schemes = schemas;
    if (values) this.values = values;
    if (strictCycle) this.config = { strictCycle };
  }

  async parser(
    values?: parser.TValues,
    strictCycle?: parser.TStrictCycle
  ): Promise<any> {
    if (values) this.values = values;
    if (strictCycle) this.config = { ...this.config, strictCycle };
    return parser.parserScheme(this.schemes, this.values, this.config);
  }
}

export default Lettuce;
