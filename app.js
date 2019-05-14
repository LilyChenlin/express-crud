var express = require('express')
var app = express()
var router = require('./router')
//引入body-parser  主要是req.body
var bodyParser = require('body-parser')

//设置公开文件
app.use('/public/',express.static('./public/'))
app.use('/node_modules',express.static('./node_modules/'))
//解析UTF-8
app.use(bodyParser.urlencoded({extended:false}))
//解析json
app.use(bodyParser.json())
// 把路由容器挂载到app中
app.use(router)
//引入 express-art-template 模板渲染 
app.engine('html',require('express-art-template'))

app.listen(5000,function () {
    console.log('5000端口启动.')
})