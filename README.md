master|develop|npm
---|---|---
[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=master)](https://travis-ci.org/sdawood/it-curry)|[![Build Status](https://travis-ci.org/sdawood/it-curry.svg?branch=develop)](https://travis-ci.org/sdawood/it-curry)|[![npm version](https://badge.fury.io/js/it-curry.svg)](https://badge.fury.io/js/it-curry)

# it-curry

`it-curry` offers a generator based unbounded currying of functions and async functions of arity > 1

```js
foo = curry(bar)
```


Because the pattern is flexible and interesting, it-curry also exposes `drip`
```js
bar = drip(foo)
```

Accepts a function `foo` of `arity` n, returns a `sink` function that you can call as many times as you need with as many arguments as you have to, internally the original function foo will be called with `arguments` of length n, hiding the complexity of the pagination away from your client code.
Upon calling the `sink function` , i.e. bar() with no arguments, the generator terminates.

Both `curry` and `drip` accept an extra argument `len` that defaults to fn.length (the number of mandatory arguments for the wrapped function, a.k.a the arity)

`acurry` is the async version of curry, which curries async functions

`adrip` is the async version of drip, which returns an async sink that drips into an async function

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


## Changelog
### 1.3.0 (2018-11-14)
#### Features
acurry, adrip: async version of both curry and drip (51354b7)

### 1.2.0 (2018-11-13)
#### Features
curry, drip: accept len from user, defaults to fn.length (arity) (2e8ed15)


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

describe('scenario: currying an async function', () => {

    const bar = async (a, b, c) => a + b + c;

    it('works: ', async done => {
        let foo = await acurry(bar);

        foo = await foo(1);
        const result = await foo(1, 1);
        const expectedResult = 3;
        expect(result).toEqual(expectedResult);
        done();
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

describe('scenario: dripping into an async function of arity 3', () => {

    it('works: brilliantly :: base case', async done => {
        const result = [];

        const foo = async (a, b, c) => {
            result.push([a, b, c]);
        };

        const bar = await adrip(foo);

        await bar(1, 2, 3);
        await bar(4, 5);
        await bar(6);
        await bar(7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);
        await bar();
        const expectedResult = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
            [13, 14, 15],
            [16, 17, undefined]
        ];
        expect(result).toEqual(expectedResult);
        done();
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
