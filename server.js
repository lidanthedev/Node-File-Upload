const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ejs = require('ejs');

const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('uploads'))

app.get('/', (req, res) => {
    res.render('index', {
        user: "lidan",
        fs: fs,
        path: require('path'),
        __dirname: __dirname
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.redirect("/");
    });
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
