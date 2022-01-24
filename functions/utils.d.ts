type OptionsFlags<Type> = {
  [Property in keyof Type]: Type[Property];
};