import { program } from 'commander';

import { parse } from './parse.js';
import { displayDiffLikeObject, getMarkedDiff } from './utils.js';

export const command = (filepath1, filepath2, { format } = {}) => {
  const file1 = parse(filepath1);

  const file2 = parse(filepath2);

  const merkedDiff = getMarkedDiff(file1, file2);

  let result = null;

  switch (format) {
    default:
      result = displayDiffLikeObject(merkedDiff, file1, file2);
      break;
  }

  console.log(result);
};

export const gendiff = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1>, <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action(command)
    .parse(process.argv);
};
