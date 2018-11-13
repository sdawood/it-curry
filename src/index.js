const {curry} = require('./curry');
const {drip} = require('./dripper');

module.exports = {
    curry,
    satisfy: curry,
    drip,
    windowInto: drip

};
