import {
  Rule, chain, noop,
} from '@angular-devkit/schematics';
import { addNodePackageDependenciesTask } from '../share/packages.factory';

export function main({
    ssml
}: {
    ssml: 'default' | 'ssml'
}): Rule {
  return () => {
    return chain([
        addNodePackageDependenciesTask('dependencies',{
            "@ask-utils/router": "3.x",
        }),
        ssml === 'default' ? noop() : addNodePackageDependenciesTask('dependencies',{
            "@ask-utils/speech-script": "3.x",
        }),
        addNodePackageDependenciesTask('devDependencies',{
            "@ask-utils/test": "3.x"
        })
    ])
  };
}