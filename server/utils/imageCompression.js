const Sharp = require('sharp');
const fs = require("fs")

module.exports = function (photos) {
    for (let photo of photos) {
        Sharp(`../client/public/${photo.filename}`)
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`../client/public/${photo.originalname}`, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(info);
                }
                fs.unlink(`../client/public/${photo.filename}`, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Файл удалён");
                    }
                });
            });

    }
    return [...photos.map((photo) => photo.originalname)]
}
