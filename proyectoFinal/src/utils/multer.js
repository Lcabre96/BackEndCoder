const multer = require('multer')
// path
const path = require('path')
console.log(path.dirname(__dirname))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.dirname(__dirname)+'/public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    },
})

const uploader = multer({storage})

module.exports = {
    uploader
}