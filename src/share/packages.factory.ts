import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { join } from 'path';

export type NodePackages = {
  [name: string]: string;
};
export const addNodePackageDependenciesTask = (
  type: 'dependencies' | 'devDependencies',
  packages: NodePackages,
  path: string = './'
): Rule => {
  const task = (_options: any): Rule => {
    const packageJsonPath = join(path, 'package.json')
    return (tree: Tree, _context: SchematicContext) => {
      const buf = tree.read(packageJsonPath);
      if (!buf) {
        throw new SchematicsException(`cannot find ${packageJsonPath}`);
      }
      const content = JSON.parse(buf.toString('utf-8'));

      content[type] = {
        ...content[type],
        ...packages,
      };

      tree.overwrite(packageJsonPath, JSON.stringify(content, null, 2));
      _context.addTask(new NodePackageInstallTask(path));
      return tree;
    };
  };
  return task;
};
