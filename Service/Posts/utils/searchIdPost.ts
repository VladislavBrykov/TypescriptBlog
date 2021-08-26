import Post from '../../../Models/Posts.model';

async function idPostValidator(idPostComment:number) {
  if (!idPostComment) {
    return { status: false, error: 'no id field' };
  }

  const searchId = await Post.findOne({
    where: { id: idPostComment.toString() },
  });
  if (searchId) {
    return true;
  }
  return false;
}

export default idPostValidator;
