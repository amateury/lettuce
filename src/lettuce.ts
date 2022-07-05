import { TValues, TStrictCycle, IScheme, TConfig, parserScheme } from "./parser";


interface TParamConstructor {
  values?: TValues;
  strictCycle?: TStrictCycle;
}

interface ILettuce {
  readonly schemes: IScheme[];
  values?: TValues;
  config?: TConfig;
}

class Lettuce implements ILettuce {
  /**
   * Object type property. List of validation schemes.
   * @defaultValue object
   */
  schemes: IScheme[];

  /**
   * values to be validated
   * @defaultValue null
   */
  values?: TValues;
  config?: TConfig;

  /**
   * Creates an instance of Lettuce.
   * @param schemas - Schemas validation
   * @param crossing - Configuration data, and optional for validation
   */
  constructor(schemas: IScheme[], crossing?: TParamConstructor) {
    const { values, strictCycle } = crossing ?? {};
    this.schemes = schemas;
    if (values) this.values = values;
    if (strictCycle) this.config = { strictCycle };
  }

  async parser(
    values?: TValues,
    strictCycle?: TStrictCycle
  ): Promise<any> {
    if (values) this.values = values;
    if (strictCycle) this.config = { ...this.config, strictCycle };
    return parserScheme(this.schemes, this.values, this.config);
  }
}

export default Lettuce;
