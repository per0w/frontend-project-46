import path from 'path';
import { readFileSync } from 'fs';

import getFileExtension from './utils.js';

const parse = (fileName) => {
  const extension = getFileExtension(fileName);

  switch (extension) {
    case 'json': {
      return JSON.parse(readFileSync(path.resolve(fileName)));
    }

    default: {
      return {};
    }
  }
};

export default parse;
