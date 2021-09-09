"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_model_1 = __importDefault(require("../../../Models/Posts.model"));
async function updateCountLikes(action, postId, likeDislike) {
    if (likeDislike === 'like') {
        const countLikes = await Posts_model_1.default.findOne({
            where: { id: postId },
            attributes: ['countLikes'],
        });
        const newCountLikes = Number(countLikes.getDataValue('countLikes')) + action;
        await Posts_model_1.default.update({ countLikes: newCountLikes }, { where: { id: postId } });
    }
    if (likeDislike === 'dislike') {
        const countLikes = await Posts_model_1.default.findOne({
            where: { id: postId },
            attributes: ['countDisLikes'],
        });
        const newCountDisLikes = Number(countLikes.getDataValue('countDisLikes')) + action;
        await Posts_model_1.default.update({ countDisLikes: newCountDisLikes }, { where: { id: postId } });
    }
}
exports.default = updateCountLikes;
//# sourceMappingURL=updateCountLikes.js.map