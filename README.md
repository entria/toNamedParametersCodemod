# ToNamedParameter Codemod

transform 

```jsx
export const defineTest = (
  dirName,
  transformName,
  options,
  testFilePrefix,
  only = false,
) => {
  console.log('ok')
}
```

to

```jsx
export const defineTest = ({
  dirName,
  transformName,
  options,
  testFilePrefix,
  only = false,
}) => {
  console.log('ok')
}
```

```jsx
module.exports = {
  // function call name
  callee: 'defineTest',
  // list of all parameters
  parameters: [
    'dirName',
    'transformName',
    'options',
    'testFilePrefix',
    'only',
  ],
}
```
    
    
## Usage

````bash
find packages/codemod/src -iname '*.spec.ts' -print | xargs jscodeshift -t packages/codemod/src/toNamedParameters/ToNamedParameters.ts --config toNamed.codemod.config.js
```
