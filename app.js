var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')

app.use('/public/',express.static('./public/'))
app.use('/node_modules',express.static('./node_modules/'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 把路由容器挂载到app中
app.use(router)
app.engine('html',require('express-art-template'))

app.listen(5000,function () {
    console.log('5000端口启动.')
})