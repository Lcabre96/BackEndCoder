const { Router } = require('express')

const router =  Router()

const users = [
    { id: '1', name: 'nombre 1', last_name: 'apellido 1', gender: 'F' },
    { id: '2', name: 'nombre 2', last_name: 'apellido 2', gender: 'F' },
    { id: '3', name: 'nombre 3', last_name: 'apellido 3', gender: 'M' },
    { id: '4', name: 'nombre 4', last_name: 'apellido 4', gender: 'F' },
    { id: '5', name: 'nombre 5', last_name: 'apellido 5', gender: 'M' }   
]

router.get('/', (req, res)=>{
    let testUser = {
        name: 'Fede',
        last_name: 'Osandon',
        role: 'admin'
    }

    res.render('index', {
        user: testUser,
        isAdmin: testUser.role === 'admin',
        users,
        style: 'index.css'
    })
})

router.get('/register', (req, res)=>{
    // const {name, last_name, email, phone} = req.body
    res.render('register')
})

module.exports = router