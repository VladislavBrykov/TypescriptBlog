import Likes from '../../../Models/Likes.model';

async function searchLikeDislikeUser(
    idPostComment: number,
    userPhoneEmail: string,
    likeDislike: string,
    typeActionPostComment: string,
) {
    const searchAction = await Likes.findOne({

        where: {postId: idPostComment.toString(), userPhoneEmail},
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
        await Likes.destroy({
            where: {
                userPhoneEmail, typeActionPostComment, postId: idPostComment.toString(), likeDislike,
            },
        });
        return true;
    }
    return true;
}

export default searchLikeDislikeUser;
