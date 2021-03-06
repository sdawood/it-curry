const {curry, acurry} = require('./curry');

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
