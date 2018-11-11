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
});
