import { API, FileInfo, Options } from 'jscodeshift';

import { getConfig } from '../getConfig';

const defaultConfig = {
  callee: null,
  parameters: [],
};

function transform(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift; // alias the jscodeshift API

  const root = j(file.source); // parse JS code into an AST

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: false,
    lineTerminator: '\n',
  };

  const config = getConfig(options, defaultConfig);

  if (!config.callee) {
    // eslint-disable-next-line
    console.log('wrong config: ', config);
    return;
  }

  root
    .find(j.ExpressionStatement)
    .filter((path) => {
      if (path.node.expression.type !== 'CallExpression') {
        return false;
      }

      if (path.node.expression.callee.name !== config.callee) {
        return false;
      }

      // handle case of single object parameter
      if (path.node.expression.arguments.length === 1) {
        return false;
      }

      return true;
    })
    .forEach((path) => {
      const properties = path.node.expression.arguments.map((arg, i) =>
        // StringLiteral
        j.objectProperty(j.identifier(config.parameters[i]), arg),
      );

      const obj = j.objectExpression(properties);

      const newExpr = j.expressionStatement(
        j.callExpression(path.node.expression.callee, [obj]),
      );

      j(path).replaceWith(newExpr);
    });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
