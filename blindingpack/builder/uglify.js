const Uglify = require('uglify-js')
const fs = require('fs')
const path = require('path')
let beforeMark = path.resolve(__dirname, '../../example/dist/beforeMark.js')
let afterMark = path.resolve(__dirname, '../../example/dist/afterMark.js')
let file3 = path.resolve(__dirname, '../src/main.js')
let data = fs.readFileSync(file3, 'utf8')



let result = Uglify.minify({'//blinding/./src/main.js': data}, {
    sourceMap: {
        filename: 'main.js',
        url: 'main.js.map',
        includeSources: true    
    },
    mangle: {
        toplevel: true,
        properties: true
    },
    compress: {
        // toplevel: true,
        dead_code: true,
        unused: true,
        evaluate: true,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: true,
    },
})
console.log(result)

fs.writeFileSync(path.resolve(__dirname, '../dist/main.js'), result.code)
fs.writeFileSync(path.resolve(__dirname, '../dist/main.js.map'), result.map)