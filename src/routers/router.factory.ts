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

export function createRequestRouter(options: {
  name: string | string[];
  path: string;
  ssml: 'default' | 'tsx';
  ["request-type"]: Request["type"];
  speech?: string;
  reprompt?: string;
  test?: boolean
}): Rule {
  return () => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    const intentName = Array.isArray(options.name) ? `[${options.name.map(name => `"${name}"`).join(',')}]`: `"${options.name}"`
    const targetName = Array.isArray(options.name) ? options.name.join('And').replace(/IntentAnd/g, 'And') : options.name
    options.name = strings.classify(targetName)
    const name = stripAmazonPrefix(targetName)
    if (!options.path) {
      throw new SchematicsException('Option (path) is required.');
    }
    const requestType = options["request-type"] || 'IntentRequest';
    const path = stripAmazonPrefix(`${options.path}/${options.name}`);
    const reprompt = options.reprompt === undefined ? 'How are you?' : options.reprompt
    const speech = options.speech || `Hello! It's a nice development. ${reprompt}`
    const canHandleTestResult = requestType === "LaunchRequest"

    const templateSource = apply(url(__dirname + '/files'), [
      options.ssml === 'default' || options["request-type"] === "SessionEndedRequest"
        ? filter((path) => !path.endsWith('.tsx'))
        : noop(),
      options.test !== false ? noop() : filter((path) => {
        return !path.startsWith('/tests')
      }),
      template({
        ...strings,
        ...options,
        name,
        intentName: intentName || 'DummyIntent',
        requestType,
        canHandleTestResult,
        reprompt,
        speech,
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
