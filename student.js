var dbPath = './db.json'
var fs = require('fs')
exports.find = callback => {
    fs.readFile(dbPath,(err,data) => {
        if (err) {
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
} 
//根据id获取学生对象
exports.findById = (id,callback) => {
    fs.readFile(dbPath,'utf8',(err,data) => {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var result = students.find((item) => {
            return item.id === id
        })
        callback(null,result)
    })
}
//保存学生信息
exports.save = (student,callback) => {
    fs.readFile(dbPath,(err,data) => {
        if (err) {
            return callback(err)
        }
        //将从文件中读取的字符串转成对象
        let students = JSON.parse(data).students
        //保存时 保证学生id单一性
        student.id = students[students.length-1].id + 1
        //将添加的学生push到这个对象中
        students.push(student)
        //将该对象转化为字符串 根据db.json格式进行保存

        let fileData = JSON.stringify({
            students:students
        })
        //写入文件
        fs.writeFile(dbPath, fileData,(err) => {
            if (err) {
                return callback(err)
            }
            //如果成功 则err为null
            callback(null)
        })
    })
}
//更新学生信息
exports.updateById = (student,callback) => {
    fs.readFile(dbPath,(err,data) => {
         if (err) {
            return callback(err)
        }
        // 获取文件中的学生
        let students = JSON.parse(data).students
        //student是传入的修改对象
        student.id = parseInt(student.id)
        
        //先找到students中要修改的学生对象
        let stu = students.find((item) => {
            return item.id === student.id
        })
        //遍历对象中的键名
        for (let key in student) {
            stu[key] = student[key]
        }
        // 将一个对象或数组转化为字符串
        let fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,err => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

//删除学生信息
exports.deleteById = (id,callback) => {
    fs.readFile(dbPath,(err,data) => {
        if (err) {
            return callback(err)
        }
        //获取文件中的学生
        //将文件中的字符串形式转化成对象
        let students = JSON.parse(data).students

        //找到要删除的对象的
        //findIndex 找到下标索引值
        let deleteId = students.findIndex((item) => {
            return item.id === parseInt(id)
        })
        //根据id删除学生
        students.splice(deleteId,1)
        //把对象转化成字符串
        let fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,err => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}