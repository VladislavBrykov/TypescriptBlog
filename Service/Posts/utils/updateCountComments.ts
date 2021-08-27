import Post from '../../../Models/Posts.model';

async function updateCountComments(action :number, postId: number) {
  const countLikes = await Post.findOne({
    where: { id: postId },
    attributes: ['countComments'],
  });
  if (countLikes != null) {
    const newCountComments = Number(countLikes.getDataValue('countComments')) + action;
    await Post.update({ countComments: newCountComments }, { where: { id: postId } });
  }
}

export default updateCountComments;
