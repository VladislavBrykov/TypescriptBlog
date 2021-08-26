import Comments from '../../../Models/Comments.model';

async function idCommentValidator(idPostComment:number) {
  if (!idPostComment) {
    return { status: false, error: 'no id field' };
  }

  const searchId = await Comments.findOne({
    where: { id: idPostComment.toString() },
  });
  if (searchId) {
    return true;
  }
  return false;
}

export default idCommentValidator;
