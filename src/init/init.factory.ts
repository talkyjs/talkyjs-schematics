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
import { createRequestRouter } from '../routers/router.factory';
import { createRequestHandler } from '../handlers/handlers.factory';
import { join } from 'path';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { ignoreTestFile } from '../share/files.utils';
import { RequestClassOptions } from '../share/RequestClass.utils';

/**
 * @TODO
 * - init npm
 * - install ask-sdk
 * - test code
 */
export type InitSkillOptions = {
  path: string;
  ssml: 'default' | 'tsx';
  database: 'dynamodb' | 's3' | 'none';
  'build-dir'?: string;
  'skill-id'?: string;
  'db-name'?: string;
  test?: 'true' | 'false';
  'handler-type'?: 'router' | 'handler'
};

export function initialzieSkill(options: InitSkillOptions): Rule {
  if (!options.database) options.database = 'none';
  const skillId = options['skill-id'] || '';
  const dbName = options['db-name'] || 'PUT_YOUR_DB_NAME';
  const path = options.path || './';
  const buildDir = options["build-dir"] || './dist';
  const controllerFilesuffix = options["handler-type"]
  const templateSource = apply(url('./files'), [
    options.ssml === 'default'
      ? filter((path) => !path.endsWith('.tsx'))
      : noop(),
    ignoreTestFile(options.test),
    template({
      ...strings,
      ...options,
      buildDir,
      skillId,
      dbName,
      controllerFilesuffix,
    }),
    move(path),
  ]);
  return branchAndMerge(mergeWith(templateSource));
}

export function main(options: InitSkillOptions): Rule {
  return () => {
    const handlerPath = join(options.path, 'src');
    const test = options.test;
    options["handler-type"] = options["handler-type"] || 'router'
    return chain([
      initialzieSkill(options),
      (tree, _context) => {
        _context.addTask(new NodePackageInstallTask(options.path));
        return tree;
      },
      createRequestClass({
        path: handlerPath,
        ssml: options.ssml,
        'request-type': 'LaunchRequest',
        name: 'LaunchRequest',
        test,
      }, options["handler-type"]),
      createRequestClass({
        path: handlerPath,
        ssml: options.ssml,
        'request-type': 'IntentRequest',
        name: 'AMAZON.HelpIntent',
        test,
      }, options["handler-type"]),
      createRequestClass({
        path: handlerPath,
        ssml: options.ssml,
        'request-type': 'IntentRequest',
        name: ['AMAZON.StopIntent', 'AMAZON.CancelIntent', 'AMAZON.NoIntent'],
        speech: 'Good-bye!',
        reprompt: '',
        test,
      }, options["handler-type"]),
    ]);
  };
}

export const createRequestClass = (options: RequestClassOptions, type: 'handler' | 'router'): Rule => {
  if (type === 'handler') return createRequestHandler(options)
  return createRequestRouter(options)
}