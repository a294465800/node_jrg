const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

function staticRoot(staticPath, req, res){

  //先解析一遍url
  let pathObj = url.parse(req.url, true)

  if(pathObj.pathname === '/'){
    pathObj.pathname += 'index.html'
  }

  const filePath = path.join(staticPath, pathObj.pathname)

  //同步读取文件
  // const fileContent = fs.readFileSync(filePath, 'binary')
  // res.write(fileContent, 'binary')
  // res.end()

  //异步读取文件
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else {
      res.write(fileContent, 'binary')
      res.end()
    }
  })
}

//console.log(__dirname)
//__dirname, 当前文件的绝对路径
//path.resolve 生成一个符合当前系统的路径
const server = http.createServer(function(req, res){
  staticRoot(path.resolve(__dirname, 'static'), req, res)
})

server.listen(3000)
console.log('listening 3000...')