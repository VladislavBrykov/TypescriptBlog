"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const imageStorage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}$`);
    },
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        cb(undefined, true);
    },
});
exports.default = imageUpload;
//# sourceMappingURL=upload.setting.for.image.js.map