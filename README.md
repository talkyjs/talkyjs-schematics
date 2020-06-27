# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Commands


```bash
# Setup Skill handler
% yarn schematics .:init --path=./tmp --dry-run=false --ssml=tsx --database=none

# Add a ask-sdk request handler
% yarn schematics .:handler --path=./tmp --dry-run=false --ssml=tsx

# Add ask-utils router (Dry run)
% yarn schematics .:router --path=./tmp/src

# Add service class
% yarn schematics .:service --path=./tmp/src --name=test --dry-run=false --test=true
```

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

 ## TODO
 - [ ] Test Code
 - [ ] Auto import generated files
 - [ ] decorator support
 - [ ] Serverless Framework yaml generation
 - [ ] Update ASK CLI build hook (v1)
 - [ ] Update ASK CLI build hook (v2)
 - [ ] Create IAM policy example
 - [ ] Update CloudFormation template for ASK CLI (v2 cfn-deployer)