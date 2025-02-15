import { program } from 'commander';

import parse from './parse.js';

const CHANGING_TYPES = {
  CHANGED: 'changed',
  UNGANGED: 'unchanged',
  DELETED: 'deleted',
  ADDED: 'added',
};

const getMarkedDiff = (file1, file2) => {
  const result = {};

  Object.entries(file1).forEach(([file1Key, file1Value]) => {
    if (file2[file1Key] !== undefined) {
      result[file1Key] = file2[file1Key] !== file1Value
        ? CHANGING_TYPES.CHANGED
        : CHANGING_TYPES.UNGANGED;
    }

    if (!file2[file1Key]) {
      result[file1Key] = CHANGING_TYPES.DELETED;
    }
  });

  Object.entries(file2).forEach(([file2Key]) => {
    if (file1[file2Key] === undefined) {
      result[file2Key] = CHANGING_TYPES.ADDED;
    }
  });

  return Object.fromEntries(
    Object.entries(result).sort((a, b) => a[0].localeCompare(b[0])),
  );
};

const displayDiffLikeObject = (merkedDiff, file1, file2) => {
  const result = {};

  Object.entries(merkedDiff).forEach(([key, type]) => {
    switch (type) {
      case CHANGING_TYPES.CHANGED: {
        result[`- ${key}`] = file1[key];
        result[`+ ${key}`] = file2[key];
        break;
      }

      case CHANGING_TYPES.UNGANGED:
        result[`  ${key}`] = file1[key];
        break;

      case CHANGING_TYPES.DELETED:
        result[`- ${key}`] = file1[key];
        break;
      case CHANGING_TYPES.ADDED:
        result[`+ ${key}`] = file2[key];
        break;
      default:
        break;
    }
  });

  return JSON.stringify(result, null, 2).replace(/("|,)/g, '');
};

const command = (filepath1, filepath2, { format } = {}) => {
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

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(command)
  .parse(process.argv);
