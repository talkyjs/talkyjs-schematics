import { strings } from '@angular-devkit/core';
import {
  Rule, SchematicsException,
  apply, branchAndMerge, mergeWith, template, url, move,
} from '@angular-devkit/schematics';

export function main(options: {
  name: string;
  path: string;
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const path = `${options.path}/${strings.dasherize(options.name)}`;

    const templateSource = apply(
      url('./files'),
      [
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