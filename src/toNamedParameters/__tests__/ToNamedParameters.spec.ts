import { defineTest } from '../../../test/testUtils';

const options = {
  testConfig: {
    callee: 'defineTest',
    parameters: [
      'dirName',
      'transformName',
      'options',
      'testFilePrefix',
      'only',
    ],
  },
};

describe('ToNamedParameters', () => {
  defineTest({
    dirName: __dirname,
    transformName: 'ToNamedParameters',
    options,
    testFilePrefix: 'call',
  });
  defineTest({
    dirName: __dirname,
    transformName: 'ToNamedParameters',
    options,
    testFilePrefix: 'same',
  });
});
