
const fs = require('fs')

module.exports = function (files) {
    console.log(files)
    for (let file of files) {

        console.log("elfk==", file)
        fs.unlink(`../client/public/${file}`, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Файл удалён");
            }
        });


    }

}
