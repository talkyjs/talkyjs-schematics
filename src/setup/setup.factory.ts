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

export function setup({ ssml }: { ssml: 'default' | 'tsx' }): Rule {
  return () => {
    return chain([
      updateTsConfig(ssml),
      addNodePackageDependenciesTask('dependencies', {
        '@talkyjs/core': '0.x',
        '@ask-utils/router': '3.x',
      }),
      ssml === 'default'
        ? noop()
        : addNodePackageDependenciesTask('dependencies', {
            '@ask-utils/speech-script': '3.x',
          }),
      addNodePackageDependenciesTask('devDependencies', {
        '@ask-utils/test': '3.x',
      }),
    ]);
  };
}

const updateTsConfig = (ssml: 'default' | 'tsx'): Rule => {
  if (ssml !== 'tsx') return noop();
  return (tree: Tree, _context: SchematicContext) => {
    const buf = tree.read('tsconfig.json');
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

    tree.overwrite('tsconfig.json', JSON.stringify(content, null, 2));

    return tree;
  };
};
