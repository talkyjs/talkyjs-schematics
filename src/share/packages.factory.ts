import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export type NodePackages = {
  [name: string]: string;
};
export const addNodePackageDependenciesTask = (
  type: 'dependencies' | 'devDependencies',
  packages: NodePackages
): Rule => {
  const task = (_options: any): Rule => {
    return (tree: Tree, _context: SchematicContext) => {
      const buf = tree.read('package.json');
      if (!buf) {
        throw new SchematicsException('cannot find package.json');
      }
      const content = JSON.parse(buf.toString('utf-8'));

      content[type] = {
        ...content[type],
        ...packages,
      };

      tree.overwrite('package.json', JSON.stringify(content, null, 2));
      _context.addTask(new NodePackageInstallTask());
      return tree;
    };
  };
  return task;
};
