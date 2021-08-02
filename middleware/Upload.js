const multer = require("multer");
const path = require('path');
const appDir = path.dirname(require.main.filename);
const storage = multer.diskStorage(
    {
        destination: appDir + '/public/images',
        filename: function (req, file, cb) {
            let accurate = process.hrtime();
            cb(null, new Date().toISOString() + '.' + accurate[0].toString() + '.' + accurate[1].toString() + '.jpg')
        }
    }
);
const upload = multer({storage: storage});


const Upload = {
    index: [
        upload.array('images', 10)
    ]
}

module.exports = Upload;