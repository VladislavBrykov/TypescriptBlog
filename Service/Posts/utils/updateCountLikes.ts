import Post from '../../../Models/Posts.model';

async function updateCountLikes(action :number, postId: number, likeDislike:string) {
  if(likeDislike === 'like') {
    const countLikes = await Post.findOne({
      where: { id: postId },
      attributes: ['countLikes'],
    });
    const newCountLikes = Number(countLikes.getDataValue('countLikes')) + action;
    await Post.update({ countLikes: newCountLikes }, { where: { id: postId } });
  }
  if(likeDislike === 'dislike') {
    const countLikes = await Post.findOne({
      where: {id: postId},
      attributes: ['countDisLikes'],
    });
    const newCountDisLikes = Number(countLikes.getDataValue('countDisLikes')) + action;
    await Post.update({countDisLikes: newCountDisLikes}, {where: {id: postId}});
  }
}

export default updateCountLikes;
