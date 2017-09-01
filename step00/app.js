var http = require('http');

var server = http.createServer(function (request, response) {

  response.setHeader('Content-Type', 'text/html')

  response.write('<html><head><meta charset="utf-8" /></head></html>')
  response.write('<body>')
  response.write('<h1>你好</h1>')
  response.write('</body>')

  response.end()
})
server.listen(8080)
console.log('listen 3000...')