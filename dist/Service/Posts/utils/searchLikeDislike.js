"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Likes_model_1 = __importDefault(require("../../../Models/Likes.model"));
async function searchLikeDislikeUser(idPostComment, phoneEmail, likeDislike, typeActionPostComment) {
    const searchAction = await Likes_model_1.default.findOne({
        where: { idPostComment: idPostComment.toString(), phoneEmail },
        attributes: ['likeDislike'],
    });
    if (!searchAction) {
        return true;
    }
    const canCreate = searchAction.getDataValue('likeDislike');
    if (canCreate === likeDislike) {
        return false;
    }
    if (canCreate !== likeDislike) {
        await Likes_model_1.default.destroy({
            where: {
                phoneEmail, typeActionPostComment, idPostComment: idPostComment.toString(), likeDislike,
            },
        });
        return true;
    }
    return true;
}
exports.default = searchLikeDislikeUser;
//# sourceMappingURL=searchLikeDislike.js.map