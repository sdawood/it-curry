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

        const bar = await drip(foo);

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
