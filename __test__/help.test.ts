import {isArray, isObject, isNumber, isString, isBrowser, isNode} from '../src/help';

test('Validate element array', async () => {
  expect(isArray([1,3])).toBe(true);
  expect(isArray(123)).toBe(false);
});

test('Validate element object', async () => {
  expect(isObject({})).toBe(true);
  expect(isObject(undefined)).toBe(false);
});

test('Validate element number', async () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber([])).toBe(false);
});


test('Validate element string', async () => {
  expect(isString("string")).toBe(true);
  expect(isString([])).toBe(false);
});

test('Validate browser-node', async () => {
  expect(isBrowser()).toBe(false);
  expect(isNode()).toBe(true);
});
