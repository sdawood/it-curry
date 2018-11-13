function * slyd(fn, len = fn.length) {
    let args = [];
    let incoming = [];
    let buffer = [];
    let rest = [];
    let _args;

    while (true) {
        if (args.length < len) {
            if (rest.length > 0) {
                while (rest.length >= len) {
                    fn(...rest.slice(0, len));
                    rest = rest.slice(len);
                }
                buffer.push(...rest);
                rest = [];
            }
            incoming = [...yield];

            if (incoming.length === 0) {
                incoming = [...buffer, ...incoming];
                args.push(...incoming);

                while (args.length > 0) {
                    fn(...args.slice(0, len));
                    args = args.slice(len);
                }
                return;
            } else {
                incoming = [...buffer, ...incoming];
                args.push(...incoming);
            }
            buffer = [];
            incoming = [];
        } else {
            _args = args.slice(0, len);
            rest = args.slice(len);
            rest = [...rest, ...yield fn(..._args)];
            _args = [];
            args = [];
        }
    }
}

function spinslyd(fn) {
    const gen = slyd(fn);

    gen.next();

    return function turn(...args) {
        const {done, value} = gen.next(args); // two way communication with the generator (::)

        return done ? value : turn;
    };
}

module.exports = {
    drip: spinslyd
};
