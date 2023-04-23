const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/svg",
    "image/svg+xml",
    "image/jpeg",

];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
module.exports = multer({
    storage: storageConfig,
    fileFilter,
});
