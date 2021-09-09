"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function renameImage(imageFilename) {
    const newName = `uploads/${imageFilename}.jpg`;
    fs_1.default.rename(`uploads/${imageFilename}`, newName, (err) => {
        if (err) {
            throw err;
        }
        console.log('renamed complete');
    });
    return newName;
}
exports.default = renameImage;
//# sourceMappingURL=rename.image.js.map