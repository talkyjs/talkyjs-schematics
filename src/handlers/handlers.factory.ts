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

export function createRequestHandler(options: {
  name: string;
  path: string;
  ssml: 'default' | 'tsx';
  ["request-type"]: string;
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    options.name = strings.classify(options.name)
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const requestType = options["request-type"] || 'IntentRequest';
    const path = `${options.path}/${options.name}`;

    const templateSource = apply(url(__dirname + '/files'), [
      options.ssml === 'default'
        ? filter((path) => !path.endsWith('.tsx'))
        : noop(),
      template({
        ...strings,
        ...options,
        requestType,
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
