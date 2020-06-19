import { strings } from '@angular-devkit/core';
import {
  Rule, SchematicsException,
  apply, branchAndMerge, mergeWith, template, url, move, noop, filter,
} from '@angular-devkit/schematics';

export function main(options: {
  name: string;
  path: string;
  ssml: 'default' | 'tsx';
  requestType: string;
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    if (!options.requestType) options.requestType = "IntentRequest"
    const path = `${options.path}/${strings.dasherize(options.name)}`;


    const templateSource = apply(
      url('./files'),
      [
        options.ssml === 'default' ? filter(path => !path.endsWith('.tsx')) : noop(),
        template({
          ...strings,
          ...options,
        }),
        move(path)
      ]
    );

    return branchAndMerge(mergeWith(templateSource));
  };
}