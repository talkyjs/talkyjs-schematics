import { strings } from '@angular-devkit/core';
import {
  Rule,
  // SchematicsException,
  apply,
  branchAndMerge,
  mergeWith,
  template,
  url,
  move,
  noop,
  filter,
  chain,
} from '@angular-devkit/schematics';
import { createRequestHandler } from '../handlers/handlers.factory';
import { join } from 'path';
import { createErrorHandler } from '../errorHandlers/handlers.factory';

/**
 * @TODO
 * - init npm
 * - install ask-sdk
 * - install ask-utils
 * - LaunchRequest
 * - HelpIntent
 * - SessionEndedRequest
 * - Stop / Cancel Intent
 * - test code
 */
export type InitSkillOptions = {
    path: string;
    ssml: 'default' | 'tsx';
    database:  "dynamodb" | "s3" | "none",
    "skill-id"?: string;
    "db-name"?: string;

}

export function initialzieSkill (options: InitSkillOptions): Rule {
    if (!options.database) options.database = "none"
    const skillId = options["skill-id"]  || ''
    const dbName = options["db-name"] || 'PUT_YOUR_DB_NAME'
    const path = options.path || './';
    const templateSource = apply(url('./files'), [
      options.ssml === 'default'
        ? filter((path) => !path.endsWith('.tsx'))
        : noop(),
      template({
        ...strings,
        ...options,
        skillId,
        dbName,
      }),
      move(path),
    ]);
    return branchAndMerge(mergeWith(templateSource))
}

export function main(options: InitSkillOptions): Rule {
  return () => {
    const handlerPath = join(options.path, 'src')
    return chain([
        initialzieSkill(options),
        createErrorHandler({
            path: handlerPath,
            ssml: options.ssml,
            name: "Error"
        }),
        createRequestHandler({
            path: handlerPath,
            ssml: options.ssml,
            "request-type": "LaunchRequest",
            name: "LaunchRequest"
        }),
    ])
  };
}
