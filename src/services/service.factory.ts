import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicsException,
  apply,
  branchAndMerge,
  mergeWith,
  template,
  url,
  move,
} from '@angular-devkit/schematics';
import { stripAmazonPrefix } from '../share/utils/intentName.utils';
import { ignoreTestFile } from '../share/files.utils';

export function main(options: {
  name: string | string[];
  path: string;
  test?: 'false' | 'true';
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    const targetName = Array.isArray(options.name)
      ? options.name.join('And').replace(/IntentAnd/g, 'And')
      : options.name;
    options.name = strings.classify(targetName);
    const name = stripAmazonPrefix(targetName);
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const path = stripAmazonPrefix(`${options.path}/${options.name}`);

    const templateSource = apply(url(__dirname + '/files'), [
      ignoreTestFile(options.test),
      template({
        ...strings,
        ...options,
        name,
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
