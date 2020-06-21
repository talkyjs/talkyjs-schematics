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
import { Request } from 'ask-sdk-model';
import { stripAmazonPrefix } from '../share/utils/intentName.utils';

export function createRequestHandler(options: {
  name: string;
  path: string;
  ssml: 'default' | 'tsx';
  ["request-type"]: Request["type"];
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    options.name = strings.classify(options.name)
    const intentName = options.name
    const name = stripAmazonPrefix({...options}.name)
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const requestType = options["request-type"] || 'IntentRequest';
    const path = stripAmazonPrefix(`${options.path}/${options.name}`);

    const templateSource = apply(url(__dirname + '/files'), [
      options.ssml === 'default' || options["request-type"] === "SessionEndedRequest"
        ? filter((path) => !path.endsWith('.tsx'))
        : noop(),
      template({
        ...strings,
        ...options,
        name,
        intentName,
        requestType,
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
