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
import { join } from 'path';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * @TODO
 * - init npm
 * - install ask-sdk
 * - test code
 */
export type InitSkillOptions = {
    path: string;
    ssml: 'default' | 'tsx';
    database:  "dynamodb" | "s3" | "none",
    "skill-id"?: string;
    "db-name"?: string;
    test?: 'true' | 'false';
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
    const test = options.test
    return chain([
        initialzieSkill(options),
        (tree, _context) => {
          _context.addTask(new NodePackageInstallTask(options.path));
          return tree
        },
        createRequestRouter({
            path: handlerPath,
            ssml: options.ssml,
            "request-type": "LaunchRequest",
            name: "LaunchRequest",
            test,
        }),
        createRequestRouter({
            path: handlerPath,
            ssml: options.ssml,
            "request-type": "IntentRequest",
            name: "AMAZON.HelpIntent",
            test,
        }),
        createRequestRouter({
            path: handlerPath,
            ssml: options.ssml,
            "request-type": "IntentRequest",
            name: ["AMAZON.StopIntent", "AMAZON.CancelIntent", "AMAZON.NoIntent"],
            speech: "Good-bye!",
            reprompt: "",
            test,
        }),
    ])
  };
}
