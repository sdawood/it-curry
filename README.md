master|develop|npm
---|---|---
[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=master)](https://travis-ci.org/sdawood/it-curry)|[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=develop)](https://travis-ci.org/sdawood/it-curry)|[![npm version](https://badge.fury.io/js/it-curry.svg)](https://badge.fury.io/js/it-curry)

# it-curry

`it-curry` offers a generator based unbounded currying of functions of arity > 1

Because the pattern is flexible and interesting, it-curry also exposts `drip`
bar = drip(foo) accepts a function foo of arity n, returns a sink function that you can call as many times as you need with as many arguments as you have to, internally the original function foo will be called with `arguments` of length n, hiding the complexity of the pagination away from your client code.
Upon calling the `sink function` , i.e. bar() with no arguments, the generator terminates.



# Usage

```js

const {curry} = require('it-curry');

let foo = curry(bar);
// call foo up to bar.length times, only executes bar when all required arguments are satisfied

foo = foo(1);
foo = foo(1, 1);
...
const result = foo(1, 1, 1, 1);
// result of executing bar with n arguments, where n >= bar.length

// See test case below for usage patterns

```

```js

const {drip} = require('it-curry');

const result = [];

const foo = (a, b, c) => {
    console.log([a, b, c]);
    result.push([a, b, c])
};

const bar = drip(foo);

bar(1, 2, 3);
bar(4, 5);
bar(6);
bar(7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);
bar();

console.log(result);

```

**Try it out `online`** [here](https://npm.runkit.com/it-curry)

# Example

## curry

```js
const {curry} = require('./curry');

describe('scenario: currying an arity 12 function', () => {

    const bar = (a, b, c, d, e, f, g, h, i, j, k, l) => (a + b + c + d + e + f + g + h + i + j + k + l);

    it('works: brilliantly :: base case', () => {
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

    it('works: brilliantly :: variants', () => {
        let foo = curry(bar);
        foo = foo(1);
        foo = foo(1, 1);
        foo = foo(1, 1, 1);
        foo = foo(1, 1, 1, 1);
        const result = foo(1, 1);
        const expectedResult = 12;
        expect(result).toEqual(expectedResult);
    });

    it('works: brilliantly :: forgives', () => {
        let foo = curry(bar);
        foo = foo(1);
        foo = foo(1, 1);
        foo = foo(1, 1, 1);
        foo = foo(1, 1, 1, 1);
        const result = foo(1, 1, 1, 1);
        const expectedResult = 12;
        expect(result).toEqual(expectedResult);
    });
});

```

## drip

```js
const {drip} = require('./dripper');

describe('scenario: dripping into a function of arity 3', () => {

    it('works: brilliantly :: base case', () => {
        const result = [];

        const foo = (a, b, c) => {
            result.push([a, b, c]);
        };

        const bar = drip(foo);

        bar(1, 2, 3);
        bar(4, 5);
        bar(6);
        bar(7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);
        bar();
        const expectedResult = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
            [13, 14, 15],
            [16, 17, undefined]
        ];
        expect(result).toEqual(expectedResult);
    });

});

```

## Possible use cases
- currying
- curried function pipeline
- deferred execution by currying with an extra dummy last argument.
- internal pagination into a handler of arity n

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
