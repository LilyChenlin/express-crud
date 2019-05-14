# express-crud
## 路由设计
|请求方法  |请求路径 |get参数|post参数|备注|
|--------|-------- |-------|--------|----|
|GET     |/students    |       |        |渲染首页|
|GET     |/students/new|   ||渲染添加学生|
|POST    |/students||name、Class、Yuwen、Math、English |处理添加学生
|GET     |/students/edit|id||渲染编辑|
|POST    |/students/edit|    |id、name、Class、Yuwen、Math、English|处理编辑请求
|GET|/students/delete|id||处理删除请求|

## 
- express
- body-parser
- express-art-template
