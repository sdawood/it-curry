master|develop|npm
---|---|---
[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=master)](https://travis-ci.org/sdawood/it-curry)|[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=develop)](https://travis-ci.org/sdawood/it-curry)|[![npm version](https://badge.fury.io/js/it-curry.svg)](https://badge.fury.io/js/it-curry)

# it-curry

`it-curry` offers a generator based unbounded currying of functions of arity > 1

Because the pattern is flexible and interesting

**Try it out `online`** [here](https://npm.runkit.com/it-curry)

# Example

```js
const {curry} = require('./index');

describe('scenario: currying an arity 12 function', () => {

    const bar = (a, b, c, d, e, f, g, h, i, j, k, l) => (a + b + c + d + e + f + g + h + i + j + k + l);

    it('works: brilliantly', () => {
        let foo = curry(bar);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        foo = foo(1);
        const result = foo(1);
        const expectedResult = 12;
        expect(result).toEqual(expectedResult);
    });

    it('works: brilliantly variants', () => {
            let foo = curry(bar);
            foo = foo(1);
            foo = foo(1, 1);
            foo = foo(1, 1, 1);
            foo = foo(1, 1, 1, 1);
            const result = foo(1, 1);
            const expectedResult = 12;
            expect(result).toEqual(expectedResult);
        });
});

```

## Possible use cases
- currying
- curried function pipeline
- deferred execution by currying with an extra dummy last argument.

## Run the tests

  ```
  npm test
  ```

## FAQs

## Build Targets
Currently the following target build environments are configured for babel-preset-env plugin
```
 "targets": {
   "node": 4.3,
   "browsers": ["last 10 versions", "ie >= 7"]
 }
```
In case this turns out to be not generous enough, more backward compatible babel transpilation targets would be added.

## Roadmap

- bigger and better
- rule'em all

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
