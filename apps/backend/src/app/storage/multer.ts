const multer = require("multer");
const fileFilter = (req, file, cb) => {
    file.mimetype === "image/jpeg" || file.mimetype === "image/png"
        ? cb(null, true)
        : cb(null, false);
};
const multerInstance = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
});

export default multerInstance
