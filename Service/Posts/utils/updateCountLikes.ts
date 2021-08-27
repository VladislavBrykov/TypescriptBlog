import Post from '../../../Models/Posts.model';

async function updateCountLikes(action :number, postId: number) {
  const countLikes = await Post.findOne({
    where: { id: postId },
    attributes: ['countLikes'],
  });
  const newCountLikes = Number(countLikes.getDataValue('countLikes')) + action;
  await Post.update({ countLikes: newCountLikes }, { where: { id: postId } });
}

export default updateCountLikes;
