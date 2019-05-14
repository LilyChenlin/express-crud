var fs = require('fs')
let express = require('express')
let Student = require('./student')
// 1. 创一个router容器
let router = express.Router()
// 2. 将路由挂载到路由容器上
router.get('/students',function (req,res) {
    // res.send('访问到了默认页面')
    // fs.readFile('./db.json',function (err,data) {
    //     if(err) {
    //         return res.status(500).send('Server error.')
    //     }
    //     res.render('students.html',{
    //         students: JSON.parse(data).students
    //     })
    // })
    Student.find((err,students) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('students.html',{
            students:students
        })
    })
    // Student.find(function (err,students) {
    //     if (err) {
    //         return res.status(500).send('Server error.')
    //     }
    //     res.render('students.html',{
    //         students:students
    //     })
    // })

})
router.get('/students/new',function (req,res) {
    res.render('new.html')

})
router.post('/students/new',function (req,res) {
    // console.log(req.body)
    //1.获取表单数据
    //2.处理 将数据保存到db.json中用以持久化
    //3.发送响应
    let student = req.body
    Student.save(student, err => {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
router.get('/students/edit',function (req,res) {
    
    Student.findById(parseInt(req.query.id),(err,student) => {
        if (err) {
            return res.status(500).send("Sever error")
        }
        // console.log(student)
        res.render('edit.html',{
            student:student
        })
    })
})
router.post('/students/edit',function (req,res) {
    // console.log(req.body)
        //1.获取表单数据 req.body
        //2.更新 Student.updateById
        //3.发送回应
        Student.updateById(req.body,function (err) {
            if (err) {
                return res.status(500).send('Server error')
            }
            res.redirect('/students')
        })
})
router.get('/students/delete',function (req,res) {
    console.log(req)
    Student.deleteById(req.body.id,function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

// 3. 将router导出
module.exports = router