const colors = require("colorette")
const util = require("util");

module.exports = {
    error: (val) => console.error(`[builder Error] ${colors.red(util.format(val))}`),
    warn: (val) => console.warn(`[builder] ${colors.yellow(val)}`),
    info: (val) => console.info(`[builder] ${colors.cyan(val)}`),
    success: (val) => console.log(`[builder] ${colors.green(val)}`),
    log: (val) => console.log(`[builder] ${val}`),
    raw: (val) => console.log(val),
};
