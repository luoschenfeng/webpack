const { Parser: AcornParser } = require("acorn");
const defaultOption = {
    ranges: true,
	locations: true,
	ecmaVersion: "latest",
	sourceType: "module",
	onComment: null
}

module.exports  = function parse (code, callback) {
    let ast 
    try {
        ast = AcornParser.parse(code, defaultOption);
        callback(null, ast)
    } catch(err) {
        callback(err)
    }

}