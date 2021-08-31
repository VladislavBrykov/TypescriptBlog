"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_model_1 = __importDefault(require("../../../Models/Posts.model"));
async function updateCountComments(action, postId) {
    const countLikes = await Posts_model_1.default.findOne({
        where: { id: postId },
        attributes: ['countComments'],
    });
    if (countLikes != null) {
        const newCountComments = Number(countLikes.getDataValue('countComments')) + action;
        await Posts_model_1.default.update({ countComments: newCountComments }, { where: { id: postId } });
    }
}
exports.default = updateCountComments;
//# sourceMappingURL=updateCountComments.js.map