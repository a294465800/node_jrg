const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const routes = {
  '/a': function(req, res){
    res.end('match /a, query is' + JSON.stringify(req.query))
  },
  '/b': function(req, res){
    res.end('match /b')
  },
  '/a/c': function(req, res){
    res.end('match /a/c')
  },
  '/search': function(req, res){
    res.end('username='+ req.body.username + ',password=' + req.body.password)
  },
}

const server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(3000)
console.log('listen 3000...')

function routePath(req, res){
  let pathObj = url.parse(req.url, true)
  let handleFn = routes[pathObj.pathname]
  if(handleFn){
    req.query = pathObj.query
    let body = ''
    req.on('data', function(chunk){
      console.log(chunk)
      body += chunk
    }).on('end', function(){
      req.body = parseBody(body)
      handleFn(req, res)
    })
  }else{
    staticRoot(path.resolve(__dirname, 'static'), req, res)
  }
}

function staticRoot(staticPath, req, res){
  let pathObj = url.parse(req.url, true)
  
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'index.html'
  }
  const filePath = path.join(staticPath, pathObj.pathname)

  fs.readFile(filePath, 'binary', function(err, content){
    if(err){
      res.writeHead(404, 'Not Found')
      return res.end()
    }

    res.writeHead(200, 'ok')
    res.write(content, 'binary')
    res.end()
  })
}

function parseBody(body){
  let obj = {}
  body.split('&').forEach(function(str) {
    obj[str.split('=')[0]] = str.split('=')[1]
  }, this);
  return obj
}