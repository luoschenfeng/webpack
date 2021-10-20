const Uglify = require('uglify-js')
const fs = require('fs')
const path = require('path')

let data = fs.readFileSync(path.resolve(__dirname, '../src/main.js'), 'utf8')



let result = Uglify.minify({'//blinding/./src/main.js': data}, {
    sourceMap: {
        filename: 'main.js',
        url: 'main.js.map',
        includeSources: true    
    },
    mangle: {
        toplevel: true,
        properties: {
            debug: "",
        }
    },
    compress: {
        // toplevel: true,
        dead_code: true,
        evaluate: true,
        pure_getters: true,
        pure_funcs: true,   
        global_defs: {
            DEBUG: true
        }
    },
})
console.log(result)

fs.writeFileSync(path.resolve(__dirname, '../dist/main.js'), result.code)
fs.writeFileSync(path.resolve(__dirname, '../dist/main.js.map'), result.map)