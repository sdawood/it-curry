function * slyd(fn, len = fn.length) {
    const args = [];

    while (true) {
        if (args.length < len) {
            const batch = [...yield];
            args.push(...batch);
        } else {
            return fn(...args);
        }
    }
}

function spinslyd(fn, len = fn.length) {
    const gen = slyd(fn, len);

    gen.next();

    return function turn(...args) {
        const {done, value} = gen.next(args); // two way communication with the generator (::)

        return done ? value : turn;
    };
}

async function * aslyd(fn, len = fn.length) {
    const args = [];

    while (true) {
        if (args.length < len) {
            const batch = [...yield];
            args.push(...batch);
        } else {
            return await fn(...args);
        }
    }
}

async function aspinslyd(fn, len = fn.length) {
    const gen = await slyd(fn, len);

    await gen.next();

    return async function turn(...args) {
        const {done, value} = await gen.next(args); // two way communication with the generator (::)

        return done ? value : turn;
    };
}

module.exports = {curry: spinslyd, acurry: aspinslyd};

