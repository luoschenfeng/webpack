const fs = require('fs')
const config = require('./config')
const logger = require('./logger')
const AcornParser = require('./parse')
let running = false
let importDeclaration = new Set()
let importForFile = new WeakMap()

function parseCode (code, callback) {
  logger.log('parse start')
  AcornParser(code, (err, ast) => {
    if(err) {callback(err)}
    logger.log('parse end')
    for (let dec of ast.body) {
      switch (statement.type) {
        case "ImportDeclaration": 
      }
    }
    callback(null, ast)
  })
}

function buildStart(flieName, callback) {
  logger.log('build start')
  fs.readFile(flieName, (err, code) => {
    if (err) {
      callback(err)
    }
    parseCode(code, callback)
  })
}

for (let id  of Object.keys(config.entry)) {
  if(running) {
    break
  } else {
    running = true
  }
  buildStart(config.entry[id], (err) => {
    if(err) {
      logger.error(err.message)
    } else {
      buildEnd()
    }
  })
}

function buildEnd () {
  running = false
  logger.success('build end')
}
