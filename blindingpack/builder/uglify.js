const Uglify = require('uglify-js')
const fs = require('fs')
const path = require('path')
<<<<<<< HEAD
let beforeMark = path.resolve(__dirname, '../../example/dist/beforeMark.js')
let afterMark = path.resolve(__dirname, '../../example/dist/afterMark.js')
let file3 = path.resolve(__dirname, '../src/main.js')
let data = fs.readFileSync(file3, 'utf8')
=======

let data = fs.readFileSync(path.resolve(__dirname, '../src/main.js'), 'utf8')
>>>>>>> f59b991108ff32002084cbe27a994b2f309b4525



let result = Uglify.minify({'//blinding/./src/main.js': data}, {
    sourceMap: {
        filename: 'main.js',
        url: 'main.js.map',
        includeSources: true    
    },
    mangle: {
        toplevel: true,
<<<<<<< HEAD
        properties: true
=======
        properties: {
            debug: "",
        }
>>>>>>> f59b991108ff32002084cbe27a994b2f309b4525
    },
    compress: {
        // toplevel: true,
        dead_code: true,
<<<<<<< HEAD
        unused: true,
        evaluate: true,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: true,
=======
        evaluate: true,
        pure_getters: true,
        pure_funcs: true,   
        global_defs: {
            DEBUG: true
        }
>>>>>>> f59b991108ff32002084cbe27a994b2f309b4525
    },
})
console.log(result)

fs.writeFileSync(path.resolve(__dirname, '../dist/main.js'), result.code)
fs.writeFileSync(path.resolve(__dirname, '../dist/main.js.map'), result.map)