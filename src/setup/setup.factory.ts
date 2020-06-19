import {
  Rule, chain,
} from '@angular-devkit/schematics';
import { addNodePackageDependenciesTask } from '../share/packages.factory';

export function main(): Rule {
  return () => {
    return chain([
        addNodePackageDependenciesTask('dependencies',{
            "@ask-utils/router": "3.x"
        }),
        addNodePackageDependenciesTask('devDependencies',{
            "@ask-utils/test": "3.x"
        })
    ])
  };
}