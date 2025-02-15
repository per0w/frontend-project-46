import { CHANGING_TYPES } from './constants.js';

export const getFileExtension = (file) => file.split('.')?.at(1)?.toLocaleLowerCase();

export const getMarkedDiff = (file1, file2) => {
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

export const displayDiffLikeObject = (merkedDiff, file1, file2) => {
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
