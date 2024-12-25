type Field<TFields extends readonly string[]> = TFields[number];
type ValidationRegex = {
    method: "regex";
    pattern: RegExp;
};
type ValidationValue = {
    method: "value";
    pattern: string;
};
type ValidationValues = {
    method: "values";
    pattern: string[];
};
export type ValidPattern = ValidationRegex | ValidationValue | ValidationValues;
export type ValidPatterns<TFields extends readonly string[]> = Record<Field<TFields>, ValidPattern>;
export type ErrorMessages<TFields extends readonly string[]> = Record<Field<TFields>, string>;
export type InvalidFields<TFields extends readonly string[]> = Map<Field<TFields>, ErrorMessages<TFields>[Field<TFields>]>;
