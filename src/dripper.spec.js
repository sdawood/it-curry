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
