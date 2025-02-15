import path, { dirname } from 'path';

import { fileURLToPath } from 'url';

import { expect, jest } from '@jest/globals';
import { command } from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('command test cases', () => {
  it('Should display diff by default', () => {
    global.console.log = jest.fn();

    command(getFixturePath('file1.json'), getFixturePath('file2.json'));

    expect(console.log).toMatchInlineSnapshot(`
[MockFunction] {
  "calls": [
    [
      "{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}",
    ],
  ],
  "results": [
    {
      "type": "return",
      "value": undefined,
    },
  ],
}
`);
  });
});
