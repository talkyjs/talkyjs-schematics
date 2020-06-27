import { noop, Rule, filter } from '@angular-devkit/schematics';
/**
 * Ignore test file
 * @param test
 */
export const ignoreTestFile = (test: 'false' | 'true' = 'true'): Rule => {
  if (test !== 'false') return noop();
  return filter((path) => {
    if (/\/tests/.test(path)) return false;
    if (/.spec.(ts|tsx)$/.test(path)) return false;
    return true;
  });
};
