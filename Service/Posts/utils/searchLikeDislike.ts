import Likes from '../../../Models/Likes.model';

async function searchLikeDislikeUser(
  idPostComment: number,
  phoneEmail: string,
  likeDislike: string,
  typeActionPostComment: string,
) {
  const searchAction = await Likes.findOne({

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
    await Likes.destroy({
      where: {
        phoneEmail, typeActionPostComment, idPostComment: idPostComment.toString(), likeDislike,
      },
    });
    return true;
  }
  return true;
}

export default searchLikeDislikeUser;
