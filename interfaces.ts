export interface Users {
    serviceLogin(phoneEmail: string, password: string): Promise<any>;
    serviceRegistration(phoneEmail: string, password: string): Promise<any>;

    serviceLogout(token: string, all: string): Promise<any>;
    serviceDeleteUser(token: string): Promise<any>;
    serviceDeleteUserByAdmin(username: string): Promise<any>;
    servicePasswordUpdate(
        phoneEmail: string,
        password: string,
        newPassword: string,
        token: string,
    ) :Promise<any>;
}

export interface Posts {
    serviceNewPost(
      title: string,
      body: string,
      token: string,
      image: string,
      username: string
    ): Promise<any>;

    serviceGetPosts(page: number, sort:string): Promise<any>;
    getPostById(postId: number): Promise<any>;
    getPostCommentsLikesById(postId: number): Promise<any>;
    serviceNewComment(
      typeAction: string,
      id: number,
      token: string,
      comment: string,
    ): Promise<any>;

    serviceNewLike(
      typeActionPostComment: string,
      idPostComment: number,
      token: string,
      phoneEmail: string,
      likeDislike: string,
    ): Promise<any>;

    serviceDeletePost(token: string, postId: number): Promise<any>;
    serviceDeleteComment(token: string, commentId: number): Promise<any>;
}
