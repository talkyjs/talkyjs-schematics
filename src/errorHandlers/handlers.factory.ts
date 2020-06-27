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
  noop,
  filter,
} from '@angular-devkit/schematics';

export function createErrorHandler(options: {
  name?: string;
  path: string;
  ssml: 'default' | 'tsx';
}): Rule {
  return () => {
    options.name = options.name || 'error';
    options.name = strings.classify(options.name);
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const path = `${options.path}/${options.name}Handler`;

    const templateSource = apply(url(__dirname + '/files'), [
      options.ssml === 'default'
        ? filter((path) => !path.endsWith('.tsx'))
        : noop(),
      template({
        ...strings,
        ...options,
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
