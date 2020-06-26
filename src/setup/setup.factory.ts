import {
  Rule,
  chain,
  noop,
  Tree,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';
import { TsConfigJson } from 'type-fest';
import { addNodePackageDependenciesTask } from '../share/packages.factory';
import { join } from 'path';

export function setup({
  ssml,
  path,
}: {
  ssml: 'default' | 'tsx',
  path: string,
}): Rule {
  return () => {
    return chain([
      updateTsConfig(path, ssml),
      addNodePackageDependenciesTask('dependencies', {
        '@talkyjs/core': '0.x',
        '@ask-utils/router': '3.x',
      }, path),
      ssml === 'default'
        ? noop()
        : addNodePackageDependenciesTask('dependencies', {
            '@ask-utils/speech-script': '3.x',
          }, path),
      addNodePackageDependenciesTask('devDependencies', {
        '@ask-utils/test': '3.x',
      }, path),
    ]);
  };
}

/**
 * @TODO
 * - Create package.json if no file available
 * - Create tsconfig.json if no file available
 */

const updateTsConfig = (path: string, ssml: 'default' | 'tsx'): Rule => {
  if (ssml !== 'tsx') return noop();
  const tsconfigPath = join(path, 'tsconfig.json')
  return (tree: Tree, _context: SchematicContext) => {
    const buf = tree.read(tsconfigPath);
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content: TsConfigJson = JSON.parse(buf.toString('utf-8'));
    if (content.compilerOptions) {
      content.compilerOptions.jsx = 'react';
    } else {
      content.compilerOptions = {
        jsx: 'react',
      };
    }

    tree.overwrite(tsconfigPath, JSON.stringify(content, null, 2));

    return tree;
  };
};
