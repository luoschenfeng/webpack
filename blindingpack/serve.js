const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    let stream
    console.log(req.url)
    if (req.url === '/') {
        stream = fs.createReadStream(path.resolve(__dirname, './dist/index.html'))
    } else {
        stream = fs.createReadStream(__dirname + '/dist' +  req.url)
    }
    stream.pipe(res)
})
server.listen(4000)