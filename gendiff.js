#!/usr/bin/env node

import { program } from 'commander';

import parse from './parse.js';

const command = (filepath1, filepath2) => {
  const file1 = parse(filepath1);

  const file2 = parse(filepath2);

  console.log(file1, file2);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(command)
  .parse(process.argv);
